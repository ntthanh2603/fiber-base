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

  @Post()
  @ResponseMessage('Create relationship')
  follow(
    @Body() updateRelationshipDto: UpdateRelationshipDto,
    @User() user: IUser,
  ) {
    return this.relationshipsService.follow(updateRelationshipDto, user);
  }

  @Delete()
  @ResponseMessage('Create relationship')
  unFollow(
    @Body() updateRelationshipDto: UpdateRelationshipDto,
    @User() user: IUser,
  ) {
    return this.relationshipsService.unFollow(updateRelationshipDto, user);
  }
}
