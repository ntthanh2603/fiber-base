import { FunctionHelper } from 'src/helper/helper.function';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { RegisterUserDto } from './dto/create-user.dto';
import { IUser } from './users.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrivacyType } from 'src/helper/helper.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private functionHelper: FunctionHelper,
  ) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  updateUserToken = (refreshToken: string, user_id: string) => {
    return this.usersRepository.update({ user_id }, { refreshToken });
  };

  findUserByToken = async (refreshToken: string) => {
    return await this.usersRepository.findOne({
      where: { refreshToken: refreshToken },
    });
  };

  async findUserByEmail(userEmail: string) {
    const user = await this.usersRepository.findOne({
      where: { email: userEmail },
    });

    if (user) if (!user.deletedAt) return user;
    return null;
  }

  async register(user: RegisterUserDto) {
    const { username, email, password, age, gender, address, description } =
      user;

    const userDb = await this.findUserByEmail(email);

    if (userDb) {
      throw new BadRequestException(`Email: ${email} already exists`);
    }

    const hashPassword = this.getHashPassword(password);

    const newUser = {
      username,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      description,
      createdAt: new Date(),
      privacy: PrivacyType.PUBLIC,
    };

    const newRegister = await this.usersRepository.save(newUser);

    return newRegister;
  }

  async findUserById(user_id: string) {
    if (!this.functionHelper.isValidUUID(user_id)) {
      throw new BadRequestException('Invalid group ID format');
    }
    const user = await this.usersRepository.findOne({
      where: { user_id },
      select: [
        'user_id',
        'email',
        'username',
        'age',
        'gender',
        'address',
        'description',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'privacy',
      ],
    });

    if (!user.deletedAt) return user;
    return null;
  }

  async deleteUser(user: IUser) {
    const userDb = await this.findUserById(user.user_id);

    if (userDb)
      return this.usersRepository.update(
        { user_id: user.user_id },
        { deletedAt: new Date() },
      );
  }

  async updateUser(updateUserDto: UpdateUserDto, user: IUser) {
    const userDb = await this.findUserById(user.user_id);

    if (userDb)
      return this.usersRepository.update(
        { user_id: userDb.user_id },
        { ...updateUserDto },
      );
  }
}
