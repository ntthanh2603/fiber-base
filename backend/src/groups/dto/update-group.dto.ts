import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ScopeType } from 'src/helper/helper.enum';

export class UpdateGroupDto {
  @IsString()
  @IsOptional()
  groupname: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsString()
  @IsNotEmpty()
  group_id: string;

  @IsString()
  @IsOptional()
  avartar: string;

  @IsString()
  @IsOptional()
  scope: ScopeType;
}
