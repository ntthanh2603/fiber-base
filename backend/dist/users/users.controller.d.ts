import { UsersService } from './users.service';
import { IUser } from './users.interface';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findUserById(user_id: string): Promise<import("./entities/user.entity").User>;
    deleteUser(user: IUser): Promise<import("typeorm").UpdateResult | {
        message: string;
    }>;
    updateUser(updateUserDto: UpdateUserDto, user: IUser): Promise<import("typeorm").UpdateResult>;
}
