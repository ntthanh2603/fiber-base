import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/users/users.interface';
import { LoginUserDto } from 'src/users/dto/login-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Login user
  // Input: LoginDto {email, password}
  // Output: cookies for client
  @Public()
  @ResponseMessage('User login')
  @Post('/login')
  handleLogin(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.login(dto, response);
  }

  // Register user
  @Public()
  @ResponseMessage('Register a new user')
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  // Get account
  // Input: access token in cookies
  // Output: IUser{ _id, name, email, role}
  @Get('/account')
  @ResponseMessage('Get user information')
  handleGetAccount(@User() user: IUser) {
    return user;
  }

  /*
    Description: 
      1. Server lấy refresh_token từ cookies
      2. Server check (verify) để biết refresh_token có hợp lệ hay không
      3. Server query database theo refresh_token để lấy thông tin user rồi tạo access_token mới
      4. Server trả phản hồi (set cookies ứng với refresh_token mới)
  */
  @Public()
  @ResponseMessage('Get user by refresh token')
  @Get('/refresh')
  handleRefreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refresh_token'];
    return this.authService.processNewToken(refreshToken, response);
  }

  /*
    Description: 
      - Update refresh_token="null" trong database
      - Xóa refresh_token ở cookies
      - Trả về phản hồi cho client
  */
  @Post('/logout')
  @ResponseMessage('Logout user')
  hendleLogout(
    @Res({ passthrough: true }) response: Response,
    @User() user: IUser,
  ) {
    return this.authService.logout(response, user);
  }
}
