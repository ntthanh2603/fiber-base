import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { RegisterUserDto } from './dto/create-user.dto';
import { IUser } from './users.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrivacyType } from 'src/helper/helper.enum';
import * as fs from 'fs';

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

  updateUserToken = (refreshToken: string, id: string) => {
    return this.usersRepository.update({ id }, { refreshToken });
  };

  findUserByToken = async (refreshToken: string) => {
    return await this.usersRepository.findOne({
      where: { refreshToken: refreshToken },
    });
  };

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOne({
      where: { email },
    });
  }

  async register(dto: RegisterUserDto, file: Express.Multer.File) {
    const userDb = await this.usersRepository.findOneBy({ email: dto.email });

    if (userDb) {
      throw new BadRequestException(`Email: ${dto.email} already exists`);
    }

    const hashPassword = this.getHashPassword(dto.password);

    let avatar = '';

    if (!file) avatar = null;
    else avatar = file.path;

    const newUser = {
      email: dto.email,
      password: hashPassword,
      avatar,
      first_name: dto.first_name,
      last_name: dto.last_name,
      bio: dto.bio,
      website: dto.website,
      age: dto.age,
      gender: dto.gender,
      address: dto.address,

      createdAt: new Date(),
      privacy: PrivacyType.PUBLIC,
    };

    const newRegister = await this.usersRepository.save(newUser);

    return newRegister;
  }

  async findUserById(id: string) {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: [
        'email',

        'age',
        'avatar',
        'gender',
        'address',

        'createdAt',
        'updatedAt',

        'privacy',
      ],
    });

    if (!user) return null;

    // if (!user.deletedAt) return user;
    return null;
  }

  async updateProfile(
    dto: UpdateUserDto,
    user: IUser,
    file: Express.Multer.File,
  ) {
    if (!file) {
      return await this.usersRepository.update(
        { id: user.id },
        {
          ...dto,
        },
      );
    } else {
      const findUser = await this.findUserById(user.id);
      const avatar = findUser.avatar;

      if (avatar) {
        try {
          if (fs.existsSync(avatar)) {
            fs.unlinkSync(avatar);
          }
        } catch (error) {
          console.error('Error deleting old avatar:', error);
        }
      }
      return await this.usersRepository.update(
        { id: user.id },
        {
          ...dto,
          avatar: file.path,
        },
      );
    }
  }
}
