import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { PrivacyType } from 'src/helper/helper.enum';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Group name' })
  groupname: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'Description group' })
  description: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: PrivacyType.PUBLIC })
  privacy: PrivacyType;
}
