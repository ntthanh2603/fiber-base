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
import { DeleteConversationMemberDto } from './dto/delete-conversation-member.dto';
import { User } from 'src/decorator/customize';

@ApiTags('Conversation members')
@Controller('conversation-members')
export class ConversationMembersController {
  constructor(
    private readonly conversationMembersService: ConversationMembersService,
  ) {}

  @Post()
  async addUser(@Body() cmDto: CreateConversationMemberDto) {
    return await this.conversationMembersService.addUser(cmDto);
  }

  @Delete()
  @ApiBody({ type: DeleteConversationMemberDto })
  async remote(
    @User() user: IUser,
    @Body() deleteDto: DeleteConversationMemberDto,
  ) {
    return await this.conversationMembersService.remote(user, deleteDto);
  }
}
