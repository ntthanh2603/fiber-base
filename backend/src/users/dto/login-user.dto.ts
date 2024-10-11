import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @IsNotEmpty({ message: 'Email không được trống' })
  @IsEmail({}, { message: 'Email không đúng định dạng' })
  email: string;

  @IsNotEmpty({ message: 'Mật khẩu không được trống' })
  @MinLength(8, { message: 'Mật khẩu không được dưới 8 kí tự' })
  @MaxLength(10, { message: 'Mật Khẩu không được trên 10 kí tự' })
  password: string;
}
