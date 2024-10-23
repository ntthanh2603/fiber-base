import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Group name' })
  groupname: string;

  @IsNotEmpty()
  @IsString({})
  @ApiProperty({ example: 'Description group' })
  description: string;
}
