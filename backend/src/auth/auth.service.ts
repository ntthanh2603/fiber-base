import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';

import { UsersService } from 'src/users/users.service';
import { Response } from 'express';
import { IUser } from 'src/users/users.interface';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Validate user
  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersService.findUserByEmail(email);
    if (!user || !this.usersService.isValidPassword(password, user.password)) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  createRefreshToken(payload) {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
    });

    return refresh_token;
  }

  async login(dto: LoginUserDto, response: Response) {
    const user = await this.validateUser(dto.email, dto.password);

    const payload = {
      id: user.id,
      email: user.email,
      avatar: user.avatar,
      username: user.username,
      bio: user.bio,
      website: user.website,
      age: user.age,
      gender: user.gender,
      address: user.address,
      privacy: user.privacy,
      follower_count: user.follower_count,
      followed_count: user.followed_count,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };

    const refresh_token = this.createRefreshToken(payload);

    await this.usersService.updateUserToken(refresh_token, user.id);

    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: +this.configService.get<string>('JWT_REFRESH_EXPIRE'),
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        bio: user.bio,
        website: user.website,
        age: user.age,
        gender: user.gender,
        addres: user.address,
      },
    };
  }

  // Register user
  async register(user: RegisterUserDto, file: Express.Multer.File) {
    const newUser = await this.usersService.register(user, file);

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        username: newUser.username,
        bio: newUser.bio,
        website: newUser.website,
        age: newUser.age,
        gender: newUser.gender,
        addres: newUser.address,
      },
    };
  }

  async processNewToken(refreshToken: string, response: Response) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });

      if (!payload || !payload.sub) {
        throw new BadRequestException('Invalid refresh token');
      }

      const user = await this.usersService.findUserByToken(refreshToken);

      if (!user) {
        throw new BadRequestException('User not found or token invalid');
      }

      const { id, email } = user;
      const newAccessToken = this.jwtService.sign(
        { id, email },
        { expiresIn: '15m' },
      );

      response.cookie('access_token', newAccessToken, { httpOnly: true });

      return {
        access_token: newAccessToken,
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          bio: user.bio,
          website: user.website,
          age: user.age,
          gender: user.gender,
          addres: user.address,
        },
      };
    } catch {
      throw new BadRequestException('Refresh token invalid or expired');
    }
  }

  async logout(response: Response, user: IUser) {
    await this.usersService.updateUserToken('', user.id);
    response.clearCookie('refresh_token');
    return user;
  }
}
