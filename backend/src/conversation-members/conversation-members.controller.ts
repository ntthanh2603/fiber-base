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
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { IUser } from 'src/users/users.interface';
import { User } from 'src/decorator/customize';
import { DeleteConversationMemberDto } from './dto/delete-conversation-member.dto';

@ApiTags('Conversation members')
@Controller('conversation-members')
export class ConversationMembersController {
  constructor(
    private readonly conversationMembersService: ConversationMembersService,
  ) {}
}
