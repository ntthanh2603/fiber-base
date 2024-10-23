import { PartialType } from '@nestjs/swagger';
import { CreateGroupUserDto } from './create-groupuser.dto';

export class UpdateGroupUserDto extends PartialType(CreateGroupUserDto) {}
