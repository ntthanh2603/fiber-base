import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ConversationMembersService } from './conversation-members.service';

import { CreateConversationMemberDto } from './dto/create-conversation-member.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Conversation members')
@Controller('conversation-members')
export class ConversationMembersController {
  constructor(
    private readonly conversationMembersService: ConversationMembersService,
  ) {}

  // Add user in conversation
  @Post()
  addUser(@Body() cmDto: CreateConversationMemberDto) {
    return this.conversationMembersService.addUser(cmDto);
  }
}
