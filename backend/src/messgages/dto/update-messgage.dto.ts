import { PartialType } from '@nestjs/swagger';
import { CreateMessageDto } from './create-messgage.dto';

export class UpdateMessgageDto extends PartialType(CreateMessageDto) {}
