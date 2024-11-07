import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GenderType, PrivacyType } from 'src/helper/helper.enum';

export class UpdateUserDto {
  @IsNotEmpty({ message: 'Tên nguời dùng không được trống' })
  @IsString()
  @ApiProperty({ example: 'Nguyễn Tuấn Thành', description: 'username' })
  @IsOptional()
  username: string;

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

  @IsOptional()
  @ApiProperty({ example: PrivacyType.PUBLIC })
  privacy: PrivacyType;
}
