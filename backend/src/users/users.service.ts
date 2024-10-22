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
import { RoleType } from 'src/helper/helper.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
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
    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ refreshToken: refreshToken })
      .where('user_id = :user_id', { user_id })
      .execute();
  };

  findUserByToken = async (refreshToken: string) => {
    return await this.usersRepository.findOne({
      where: { refreshToken: refreshToken },
    });
  };

  async findUserByEmail(userEmail: string) {
    const user = await this.usersRepository.findOne({
      where: { email: userEmail },
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
      ],
    });
    if (!user) throw new NotFoundException('User does not exist');

    if (!user.deletedAt) return user;
    else throw new NotFoundException('User deleted');
  }

  async register(user: RegisterUserDto) {
    const { username, email, password, age, gender, address, description } =
      user;

    const isExist = await this.findUserByEmail(email);
    if (isExist) {
      throw new BadRequestException(`Email: ${email} already exists`);
    }

    const hashPassword = this.getHashPassword(password);

    let newUser = {
      username,
      email,
      password: hashPassword,
      age,
      gender,
      address,
      description,
    };

    await this.usersRepository.save(newUser);

    const newRegister = await this.findUserByEmail(email);

    await this.historysService.createHistoty({
      target_id: newRegister.user_id,
      createdBy: email,
      createdAt: new Date(),
      role: RoleType.USER,
    });

    return newRegister;
  }

  // Find one user by email
  async findUserById(user_id: string) {
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
      ],
    });
    if (!user) throw new NotFoundException('User does not exist');

    if (!user.deletedAt) return user;
    else throw new NotFoundException('User deleted');
  }

  // Delete user by id
  async deleteUser(user: IUser) {
    const findUser = await this.findUserById(user.user_id);

    if (findUser.deletedAt)
      return this.usersRepository.update(
        { user_id: user.user_id },
        { deletedAt: new Date() },
      );
  }

  async updateUser(updateUserDto: UpdateUserDto, user: IUser) {
    const empty = await this.findUserById(user.user_id);

    const isDelete = await this.historysService.isDeleted({
      target_id: user.user_id,
      role: RoleType.USER,
    });

    if (empty && !isDelete) {
      await this.historysService.updateHistory({
        target_id: user.user_id,
        updatedAt: new Date(),
        updatedBy: user.email,
        role: RoleType.USER,
      });
      return this.usersRepository.update(
        { user_id: user.user_id },
        { ...updateUserDto },
      );
    }
    throw new NotFoundException('Not found user');
  }
}
