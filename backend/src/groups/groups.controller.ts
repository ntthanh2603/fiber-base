import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { IUser } from 'src/users/users.interface';
import { User } from 'src/decorator/customize';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiBody({ type: CreateGroupDto })
  async create(@User() user: IUser, @Body() createDto: CreateGroupDto) {
    return await this.groupsService.create(user, createDto);
  }
}
