import { GenderType } from 'src/helper/helper.enum';
export declare class RegisterUserDto {
    username: string;
    email: string;
    password: string;
    age: number;
    gender: GenderType;
    address: string;
    description: string;
}
