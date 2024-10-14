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
    if (
      !user ||
      !(await this.usersService.isValidPassword(password, user.password))
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  // Login user
  async login(loginUserDto: LoginUserDto, response: Response) {
    const { email, password } = loginUserDto;
    const user = await this.validateUser(email, password);
    const { user_id, username } = user;
    const payload = {
      user_id,
      username,
      email,
    };

    // Tạo token
    const refresh_token = this.createRefreshToken(payload);

    // Đẩy token lên database
    await this.usersService.updateUserToken(refresh_token, user_id);

    // Trả cookies về cho client
    response.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      maxAge: +this.configService.get<string>('JWT_REFRESH_EXPIRE'),
    });

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        user_id,
        username,
        email,
      },
    };
  }

  // Register user
  async register(user: RegisterUserDto) {
    let newUser = await this.usersService.register(user);

    return {
      user_id: newUser.user_id,
      username: newUser.username,
      email: newUser.email,
    };
  }

  // Create token
  createRefreshToken = (payload) => {
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
    });

    return refresh_token;
  };

  processNewToken = async (refreshToken: string, response: Response) => {
    try {
      this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      });

      let user = await this.usersService.findUserByToken(refreshToken);

      if (user) {
        const { username, user_id, email } = user;
        const payload = {
          user_id,
          username,
          email,
        };

        // Tạo token
        const refresh_token = this.createRefreshToken(payload);

        // Đẩy token lên database
        await this.usersService.updateUserToken(refresh_token, user_id);

        // Xóa token cũ
        response.clearCookie('refresh_token');

        // Trả cookies về cho client
        response.cookie('refresh_token', refresh_token, {
          httpOnly: true,
          maxAge: +this.configService.get<string>('JWT_REFRESH_EXPIRE'),
        });

        return {
          access_token: this.jwtService.sign(payload),
          user: {
            user_id,
            username,
            email,
          },
        };
      } else {
        throw new BadRequestException('Refresh invalid');
      }
    } catch (error) {
      throw new BadRequestException('Refresh invalid');
    }
  };

  logout = async (response: Response, user: IUser) => {
    await this.usersService.updateUserToken('', user.user_id);
    response.clearCookie('refresh_token');
    return 'OK';
  };
}
