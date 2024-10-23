import { PartialType } from '@nestjs/swagger';
import { CreateHagtagDto } from './create-hagtag.dto';

export class UpdateHagtagDto extends PartialType(CreateHagtagDto) {}
