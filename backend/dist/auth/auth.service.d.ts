import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';
import { IUser } from 'src/users/users.interface';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { User } from 'src/users/entities/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    validateUser(email: string, password: string): Promise<User>;
    login(loginUserDto: LoginUserDto, response: Response): Promise<{
        access_token: string;
        user: {
            user_id: string;
            username: string;
            email: string;
        };
    }>;
    register(user: RegisterUserDto): Promise<{
        user_id: string;
        username: string;
        email: string;
    }>;
    createRefreshToken: (payload: any) => string;
    processNewToken: (refreshToken: string, response: Response) => Promise<{
        access_token: string;
        user: {
            user_id: string;
            username: string;
            email: string;
        };
    }>;
    logout: (response: Response, user: IUser) => Promise<string>;
}
