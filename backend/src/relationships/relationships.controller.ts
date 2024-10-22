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
import { ResponseMessage, User } from 'src/decorator/customize';
import { ApiTags } from '@nestjs/swagger';
import { IUser } from 'src/users/users.interface';

@ApiTags('Relationships')
@Controller('relationships')
export class RelationshipsController {
  constructor(private readonly relationshipsService: RelationshipsService) {}

  // Relationship 2 user
  @Post()
  @ResponseMessage('Create relationship')
  async reate(
    @Body() createRelationshipDto: CreateRelationshipDto,
    @User() user: IUser,
  ) {
    return await this.relationshipsService.update(createRelationshipDto, user);
  }

  @Patch()
  @ResponseMessage('Create relationship')
  async update(
    @Body() updateRelationshipDto: UpdateRelationshipDto,
    @User() user: IUser,
  ) {
    return await this.relationshipsService.update(updateRelationshipDto, user);
  }
}
