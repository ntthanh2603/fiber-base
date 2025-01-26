import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/users/users.interface';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @ResponseMessage('User login')
  @Post('/login')
  @ApiBody({ type: LoginUserDto })
  handleLogin(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(dto, response);
  }

  @Public()
  @ResponseMessage('Register a new user')
  @Post('/register')
  @UseInterceptors(FileInterceptor('avatar-user'))
  @ApiBody({ type: RegisterUserDto })
  handleRegister(
    @Body() registerUserDto: RegisterUserDto,
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
    return this.authService.register(registerUserDto, file);
  }

  @Get('/account')
  @ResponseMessage('Get user information')
  handleGetAccount(@User() user: IUser) {
    return user;
  }

  @Public()
  @ResponseMessage('Get user by refresh token')
  @Get('/refresh')
  handleRefreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refresh_token'];

    if (!refreshToken) {
      throw new BadRequestException('Refresh token is missing');
    }
    return this.authService.processNewToken(refreshToken, response);
  }

  @Post('/logout')
  @ResponseMessage('Logout user')
  hendleLogout(
    @Res({ passthrough: true }) response: Response,
    @User() user: IUser,
  ) {
    return this.authService.logout(response, user);
  }
}
