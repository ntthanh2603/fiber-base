import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/users/users.interface';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    handleLogin(dto: LoginUserDto, response: Response): Promise<{
        access_token: string;
        user: {
            user_id: string;
            username: string;
            email: string;
        };
    }>;
    handleRegister(registerUserDto: RegisterUserDto): Promise<{
        user_id: string;
        username: string;
        email: string;
    }>;
    handleGetAccount(user: IUser): IUser;
    handleRefreshToken(request: Request, response: Response): Promise<{
        access_token: string;
        user: {
            user_id: string;
            username: string;
            email: string;
        };
    }>;
    hendleLogout(response: Response, user: IUser): Promise<string>;
}
