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
import { DeleteGroupDto } from './dto/delete-group.dto';

@ApiTags('Groups')
@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  @ApiBody({ type: CreateGroupDto })
  create(@User() user: IUser, @Body() createDto: CreateGroupDto) {
    return this.groupsService.create(user, createDto);
  }

  @Patch()
  @ApiBody({ type: UpdateGroupDto })
  update(@User() user: IUser, @Body() updateDto: UpdateGroupDto) {
    return this.groupsService.update(user, updateDto);
  }

  @Delete()
  @ApiBody({ type: DeleteGroupDto })
  remote(@User() user: IUser, @Body() deleteDto: DeleteGroupDto) {
    return this.groupsService.remote(user, deleteDto);
  }
}
