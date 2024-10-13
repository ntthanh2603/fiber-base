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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get(':user_id')
  @ResponseMessage('User by user_id')
  findUserById(@Param('user_id') user_id: string) {
    return this.usersService.findUserById(user_id);
  }

  // @Post(':user_id')
  // @ResponseMessage('Delete user')
  // deleteUserById(@Param() user_id: string, @User() user: IUser) {
  //   user_id = user_id['user_id'];
  //   return this.usersService.deleteUserById(user_id, user);
  // }

  // @Patch('update')
  // @ResponseMessage('Update User')
  // updateUser(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
  //   return this.usersService.updateUser(updateUserDto, user);
  // }
}
