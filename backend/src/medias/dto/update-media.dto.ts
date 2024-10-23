import { PartialType } from '@nestjs/swagger';
import { CreateMediaDto } from './create-media.dto';

export class UpdateMediaDto extends PartialType(CreateMediaDto) {}
