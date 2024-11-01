import { PartialType } from '@nestjs/mapped-types';
import { CreateRelationshipDto } from './create-relationship.dto';

export class UpdateRelationshipDto extends PartialType(CreateRelationshipDto) {}
