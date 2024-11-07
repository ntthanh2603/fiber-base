import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Users')
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
  @UseInterceptors(FileInterceptor('avatar-user'))
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @User() user: IUser,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1000 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.usersService.updateProfile(updateUserDto, user, file);
  }
}
