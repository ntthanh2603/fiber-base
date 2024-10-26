import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { GroupUsersService } from './groupusers.service';

import { IUser } from 'src/users/users.interface';
import { User } from 'src/decorator/customize';
import { AddUserGroupDto } from './dto/add-usergroup.dto';
import { AddAdminGroupDto } from './dto/add-admingroup.dto';
import { DeleteGroupUserDto } from './dto/delete-groupuser.dto';

@ApiTags('Groupusers')
@Controller('groupusers')
export class GroupUsersController {
  constructor(private readonly groupusersService: GroupUsersService) {}

  @Post('add-user')
  @ApiProperty({ type: AddUserGroupDto })
  async addUser(@User() user: IUser, @Body() addDto: AddUserGroupDto) {
    return await this.groupusersService.addUser(user, addDto);
  }

  @Post('add-admin')
  @ApiProperty({ type: AddAdminGroupDto })
  async addAdmin(@User() user: IUser, @Body() addDto: AddAdminGroupDto) {
    return await this.groupusersService.addAdmin(user, addDto);
  }

  @Delete()
  @ApiProperty({ type: DeleteGroupUserDto })
  async remote(@User() user: IUser, @Body() deleteDto: DeleteGroupUserDto) {
    return await this.groupusersService.remote(user, deleteDto);
  }
}
