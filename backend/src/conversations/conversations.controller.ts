import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { IUser } from 'src/users/users.interface';
import { User } from 'src/decorator/customize';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  /*
    Create Conversation
    - Input: User by token and name conversation
  */
  @Post('/create')
  creare(@User() user: IUser, @Body() conversation_name: string) {
    return this.conversationsService.create(user, conversation_name);
  }
}
