import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsSemVer,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GenderType, PrivacyType } from 'src/helper/helper.enum';

export class RegisterUserDto {
  @IsNotEmpty({ message: 'Tên nguời dùng không được trống' })
  @IsString()
  @ApiProperty({ example: 'Nguyễn Tuấn Thành', description: 'username' })
  username: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty({ message: 'Email không được trống' })
  @ApiProperty({ example: 'user@gmail.com', description: 'email' })
  email: string;

  @MinLength(8)
  @MaxLength(10)
  @IsString()
  @IsNotEmpty({ message: 'Mật khẩu không được trống' })
  @ApiProperty({ example: '12345678', description: 'password' })
  password: string;

  @ApiProperty({ example: 20, description: 'age' })
  @IsOptional()
  age: number;

  @ApiProperty({ example: GenderType.MALE, description: 'gender' })
  @IsOptional()
  gender: GenderType;

  @ApiProperty({ example: 'Cau Giay, Ha Noi', description: 'address' })
  @IsOptional()
  address: string;

  @ApiProperty({ example: 'Good boy', description: 'description' })
  @IsOptional()
  description: string;

  @ApiProperty({ example: 'image.png', description: 'avartar' })
  @IsOptional()
  avartar: string;

  @IsOptional()
  @ApiProperty({ example: PrivacyType.PUBLIC })
  privacy: PrivacyType;
}
