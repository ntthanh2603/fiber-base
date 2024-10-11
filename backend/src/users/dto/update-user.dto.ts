import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(RegisterUserDto) {}
