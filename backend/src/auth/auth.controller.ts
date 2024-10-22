import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public, ResponseMessage, User } from 'src/decorator/customize';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { Request, Response } from 'express';
import { IUser } from 'src/users/users.interface';
import { LoginUserDto } from 'src/users/dto/login-user.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /*
    - Login user
    - Input: email, password
    - Output: access tokken
    - Description: server nhận email, password từ client rồi kiểm tra 
    xem email có trong database không, nếu có thì có trùng password không
    nếu trùng thì trả về user. Dùng user vừa lấy ra tạo refresh token 
    cho lên database, còn access token trả về response cho người.
  */
  @Public()
  @ResponseMessage('User login')
  @Post('/login')
  @ApiBody({ type: LoginUserDto })
  async handleLogin(
    @Body() dto: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.login(dto, response);
  }

  /*
    - Register user
    - Input: username, email, password, age, gender, address, description
    - Output: tạo tài khoản mới có trong database
    - Description: sau khi lấy được input từ Body server xem email đã 
    có trong 1 tài khoản nào trong database chưa, nếu chưa thì tạo 
    hash password rồi đẩy lên database.
  */
  @Public()
  @ResponseMessage('Register a new user')
  @Post('/register')
  @ApiBody({ type: RegisterUserDto })
  async handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return await this.authService.register(registerUserDto);
  }

  // Get account
  // Input: access token in cookies
  // Output: IUser{ id, username, email, role}
  @Get('/account')
  @ResponseMessage('Get user information')
  handleGetAccount(@User() user: IUser) {
    return user;
  }

  /*
    - Refresh 
    - Input: refresh token
    - Output: access token
    Description: 
      1. Server lấy refresh_token từ cookies
      2. Server check (verify) để biết refresh_token có hợp lệ hay không
      3. Server query database theo refresh_token để lấy thông tin user rồi tạo access_token mới
      4. Server trả phản hồi (set cookies ứng với refresh_token mới)
  */
  @Public()
  @ResponseMessage('Get user by refresh token')
  @Get('/refresh')
  async handleRefreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken = request.cookies['refresh_token'];
    return await this.authService.processNewToken(refreshToken, response);
  }

  /*
    - Log out
    - Input: 
    - Output: 
    - Description: 
        + Update refresh_token="null" trong database
        + Xóa refresh_token ở cookies
        + Trả về phản hồi cho client
  */
  @Post('/logout')
  @ResponseMessage('Logout user')
  async hendleLogout(
    @Res({ passthrough: true }) response: Response,
    @User() user: IUser,
  ) {
    return await this.authService.logout(response, user);
  }
}
