import { PartialType } from '@nestjs/mapped-types';
import { CreateMediaDto } from './create-media.dto';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {}
