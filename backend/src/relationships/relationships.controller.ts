import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';
import { ResponseMessage } from 'src/decorator/customize';

@Controller('relationships')
export class RelationshipsController {
  constructor(private readonly relationshipsService: RelationshipsService) {}

  // Relationship 2 user
  @Post('/relationship-user')
  @ResponseMessage('Updated relationship')
  relationshipUser(@Body() createRelationshipDto: CreateRelationshipDto) {
    return this.relationshipsService.relationshipUser(createRelationshipDto);
  }
}
