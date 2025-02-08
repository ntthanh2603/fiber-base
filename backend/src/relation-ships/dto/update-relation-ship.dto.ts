import { PartialType } from '@nestjs/swagger';
import { CreateRelationShipDto } from './create-relation-ship.dto';

export class UpdateRelationShipDto extends PartialType(CreateRelationShipDto) {}
