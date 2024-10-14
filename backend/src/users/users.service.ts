import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { RegisterUserDto } from './dto/create-user.dto';
import { IUser } from './users.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { HistorysService } from 'src/historys/historys.service';
import { RoleType } from 'src/helper/helper.enum';
import { CreateHistoryDto } from 'src/historys/dto/create-history.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private historysService: HistorysService,
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
    return await this.usersRepository.findOne({
      where: { email: userEmail },
    });
  }

  async register(user: RegisterUserDto) {
    const { username, email, password, age, gender, address, description } =
      user;

    const isExist = await this.usersRepository.findOne({
      where: { email: email },
    });
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

    // const createHistoryDto = CreateHistoryDto(
    //   target_id =  newRegister.user_id,
    //   createdBy: newRegister.email,
    //   role: RoleType.USER,
    // )

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
        'username',
        'age',
        'gender',
        'address',
        'description',
      ],
    });

    if (user) {
      return user;
    }
    return 'User not found';
  }

  // Delete user by id
  async deleteUserById(user_id: string, user: IUser) {
    if (user_id != user.user_id)
      return 'You do not have permission to delete this account';

    const userDel = await this.findUserByEmail(user_id);

    const isDelete = await this.historysService.isDeleted({
      target_id: user_id,
      role: RoleType.USER,
    });

    if (!userDel) {
      return 'User not found';
    }
    if (userDel && !isDelete) {
      return this.historysService.deleteHistory({
        target_id: user_id,
        deletedAt: new Date(),
        deletedBy: user.email,
        role: RoleType.USER,
      });
    }
  }

  async updateUser(updateUserDto: UpdateUserDto, user: IUser) {
    const empty = await this.usersRepository.findOne({
      where: { email: updateUserDto.email },
    });

    if (!empty) {
      return this.usersRepository.update({ id: user.id }, { ...updateUserDto });
    }

    return 'Someone has used this email';
  }
}
