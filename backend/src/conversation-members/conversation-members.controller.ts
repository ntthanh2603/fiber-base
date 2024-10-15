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
import { User } from 'src/decorator/customize';
import { IUser } from 'src/users/users.interface';
import { CreateConversationMemberDto } from './dto/create-conversation-member.dto';

@Controller('conversation-members')
export class ConversationMembersController {
  constructor(
    private readonly conversationMembersService: ConversationMembersService,
  ) {}

  // Add user in conversation
  @Post('/add')
  addUser(@User() user: IUser, cmDto: CreateConversationMemberDto) {
    return this.conversationMembersService.addUser(user, cmDto);
  }
}
