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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { IUser } from 'src/users/users.interface';

@ApiTags('Relationships')
@Controller('relationships')
export class RelationshipsController {
  constructor(private readonly relationshipsService: RelationshipsService) {}

  @Post('follow')
  @ResponseMessage('Create relationship')
  @ApiBody({ type: CreateRelationshipDto })
  follow(@Body() dto: CreateRelationshipDto, @User() user: IUser) {
    return this.relationshipsService.follow(dto, user);
  }

  @Post('unfollow')
  @ResponseMessage('Create relationship')
  @ApiBody({ type: CreateRelationshipDto })
  unFollow(@Body() dto: CreateRelationshipDto, @User() user: IUser) {
    return this.relationshipsService.unFollow(dto, user);
  }
}
