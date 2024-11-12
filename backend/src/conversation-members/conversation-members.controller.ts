import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ConversationMembersService } from './conversation-members.service';
import { ApiTags } from '@nestjs/swagger';
import { AddConversationMember } from './dto/add-conversation-member.dto';
import { MemberConversationGuard } from 'src/guard/guard-conversation-member';
import { FriendRelationshipGuard } from 'src/guard/guard-relationship-friend';

@ApiTags('Conversation members')
@Controller('conversation-members')
export class ConversationMembersController {
  constructor(
    private readonly conversationMembersService: ConversationMembersService,
  ) {}

  @Post('add-member')
  @UseGuards(FriendRelationshipGuard)
  @UseGuards(MemberConversationGuard)
  addMember(@Body() dto: AddConversationMember) {
    return this.conversationMembersService.addMember(dto);
  }
}
