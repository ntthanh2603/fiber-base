import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { IUser } from 'src/users/users.interface';
import { ResponseMessage, User } from 'src/decorator/customize';
import { ApiTags } from '@nestjs/swagger';
import { MessagesService } from './messgages.service';
import { CreateMessageDto } from './dto/create-messgage.dto';

@ApiTags('Messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}
  @Post()
  @ResponseMessage('Create message')
  async create(
    @User() user: IUser,
    @Body() createMessageDto: CreateMessageDto,
  ) {
    return await this.messagesService.create(user, createMessageDto);
  }
}
