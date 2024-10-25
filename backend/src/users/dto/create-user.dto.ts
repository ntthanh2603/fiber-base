import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GenderType } from 'src/helper/helper.enum';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Tên nguời dùng không được trống' })
  @ApiProperty({ example: 'Nguyễn Tuấn Thành', description: 'username' })
  username: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email không được trống' })
  @ApiProperty({ example: 'user@gmail.com', description: 'email' })
  email: string;

  @MinLength(8)
  @MaxLength(10)
  @IsNotEmpty({ message: 'Mật khẩu không được trống' })
  @ApiProperty({ example: '12345678', description: 'password' })
  password: string;

  @IsNotEmpty({ message: 'Tuổi không được trống' })
  @ApiProperty({ example: 20, description: 'age' })
  @IsOptional()
  age: number;

  @IsNotEmpty({ message: 'Giới tính không được trống' })
  @ApiProperty({ example: GenderType.MALE, description: 'gender' })
  @IsOptional()
  gender: GenderType;

  @IsNotEmpty({ message: 'Địa chỉ không được trống' })
  @ApiProperty({ example: 'Cau Giay, Ha Noi', description: 'address' })
  @IsOptional()
  address: string;

  @IsNotEmpty({ message: 'Thêm mô tả' })
  @ApiProperty({ example: 'Good boy', description: 'description' })
  @IsOptional()
  description: string;

  @IsNotEmpty({ message: 'Avartarn not null' })
  @ApiProperty({ example: 'image.png', description: 'avartar' })
  @IsOptional()
  avartar: string;
}
