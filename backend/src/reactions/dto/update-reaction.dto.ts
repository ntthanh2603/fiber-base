import { PartialType } from '@nestjs/mapped-types';
import { CreateReactionDto } from './create-reaction.dto';

export class UpdateReactionDto extends PartialType(CreateReactionDto) {}
