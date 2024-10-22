import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get(':user_id')
  @ResponseMessage('User by user_id')
  findUserById(@Param('user_id') user_id: string) {
    return this.usersService.findUserById(user_id);
  }

  @Delete()
  @ResponseMessage('Delete user')
  deleteUser(@User() user: IUser) {
    return this.usersService.deleteUser(user);
  }

  @Patch()
  @ResponseMessage('Update User')
  updateUser(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    return this.usersService.updateUser(updateUserDto, user);
  }
}
