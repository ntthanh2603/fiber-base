import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ScopeType } from 'src/helper/helper.enum';

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
  @ApiProperty({ example: ScopeType.PUBLIC })
  scope: ScopeType;
}
