import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { GenderType } from 'src/helper/helper.enum';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Tên nguời dùng không được trống' })
  username: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email không được trống' })
  email: string;

  @MinLength(8)
  @MaxLength(10)
  @IsNotEmpty({ message: 'Mật khẩu không được trống' })
  password: string;

  @IsNotEmpty({ message: 'Tuổi không được trống' })
  age: number;

  @IsNotEmpty({ message: 'Giới tính không được trống' })
  gender: GenderType;

  @IsNotEmpty({ message: 'Địa chỉ không được trống' })
  address: string;

  @IsNotEmpty({ message: 'Thêm mô tả' })
  description: string;
}
