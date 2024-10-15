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
import { CreateConversationDto } from './dto/create-conversation.dto';

@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  /*
    Create Conversation
    - Input: User by token and name conversation
  */
  @Post('/create')
  creare(@User() user: IUser, @Body() dto: CreateConversationDto) {
    return this.conversationsService.create(user, dto);
  }
}
