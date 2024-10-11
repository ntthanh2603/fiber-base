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
  @Get(':id')
  @ResponseMessage('User by id')
  findUserById(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Post(':id')
  @ResponseMessage('Delete user')
  deleteUserById(@Param() id: string, @User() user: IUser) {
    id = id['id'];
    return this.usersService.deleteUserById(id, user);
  }

  @Patch('update')
  @ResponseMessage('Update User')
  updateUser(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    return this.usersService.updateUser(updateUserDto, user);
  }
}
