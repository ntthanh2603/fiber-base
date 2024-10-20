import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { IUser } from 'src/users/users.interface';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: IUser): Promise<{
        user_id: string;
        username: string;
        email: string;
    }>;
}
export {};
