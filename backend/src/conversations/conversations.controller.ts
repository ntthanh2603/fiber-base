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
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('Conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @ApiBody({ type: CreateConversationDto })
  creare(@User() user: IUser, @Body() dto: CreateConversationDto) {
    return this.conversationsService.create(user, dto);
  }
}
