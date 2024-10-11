import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { RegisterUserDto } from './dto/create-user.dto';

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
    console.log(password, hash);
    return compareSync(password, hash);
  }
  // async findUserByEmail(email: string) {
  //   return await this.usersRepository
  //     .createQueryBuilder('user')
  //     .select(['-user.password'])
  //     .where('user.email = :email', { email })
  //     .getOne();
  // }

  updateUserToken = (refreshToken: string, id: string) => {
    return this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ refreshToken: refreshToken })
      .where('id = :id', { id })
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
    const { username, email, password, age, gender, address } = user;

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
    };

    let newRegister = await this.usersRepository.save(newUser);

    return newRegister;
  }
}
