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

  /*
    - Delete user
    - Description: Kiểm tra xem người xóa là ai nếu xóa đúng id của họ thì 
    kiểm tra user đã xóa hay chưa, nếu xóa rồi thì thông báo đã xóa, 
    nếu chưa thì cập nhật bảng history là đã xóa.

  */
  @Post('/delete')
  @ResponseMessage('Delete user')
  deleteUser(@User() user: IUser) {
    return this.usersService.deleteUser(user);
  }

  @Patch('update')
  @ResponseMessage('Update User')
  updateUser(@Body() updateUserDto: UpdateUserDto, @User() user: IUser) {
    return this.usersService.updateUser(updateUserDto, user);
  }
}
