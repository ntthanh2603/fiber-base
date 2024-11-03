import { PartialType } from '@nestjs/swagger';
import { CreateMessgageDto } from './create-messgage.dto';

export class UpdateMessgageDto extends PartialType(CreateMessgageDto) {}
