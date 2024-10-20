import { GenderType, StatusType } from 'src/helper/helper.enum';
export declare class User {
    user_id: string;
    username: string;
    email: string;
    password: string;
    avartar: string;
    age: number;
    gender: GenderType;
    address: string;
    description: string;
    status: StatusType;
    refreshToken: string;
}
