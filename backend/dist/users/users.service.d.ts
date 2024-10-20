import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { RegisterUserDto } from './dto/create-user.dto';
import { IUser } from './users.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { HistorysService } from 'src/historys/historys.service';
export declare class UsersService {
    private usersRepository;
    private historysService;
    constructor(usersRepository: Repository<User>, historysService: HistorysService);
    getHashPassword: (password: string) => string;
    isValidPassword(password: string, hash: string): boolean;
    updateUserToken: (refreshToken: string, user_id: string) => Promise<import("typeorm").UpdateResult>;
    findUserByToken: (refreshToken: string) => Promise<User>;
    findUserByEmail(userEmail: string): Promise<User>;
    register(user: RegisterUserDto): Promise<User>;
    findUserById(user_id: string): Promise<User>;
    deleteUser(user: IUser): Promise<import("typeorm").UpdateResult | {
        message: string;
    }>;
    updateUser(updateUserDto: UpdateUserDto, user: IUser): Promise<import("typeorm").UpdateResult>;
}
