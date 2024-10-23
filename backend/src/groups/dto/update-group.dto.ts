import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateGroupDto extends PartialType(CreateGroupDto) {
  @IsString()
  @IsOptional()
  avatar: string;
}
