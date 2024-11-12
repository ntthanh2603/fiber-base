import { Controller, Post, Body, UseGuards, Patch } from '@nestjs/common';
import { ConversationMembersService } from './conversation-members.service';
import { ApiTags } from '@nestjs/swagger';
import { AddConversationMember } from './dto/add-conversation-member.dto';
import { MemberConversationGuard } from 'src/guard/guard-conversation-member';
import { FriendRelationshipGuard } from 'src/guard/guard-relationship-friend';
import { AdminConversationGuard } from 'src/guard/guard-conversation-admin';
import { AddConversationAdmin } from './dto/add-conversation-admin.dto';

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

  @Patch('add-admin')
  @UseGuards(AdminConversationGuard)
  addAdmin(@Body() dto: AddConversationAdmin) {
    return this.conversationMembersService.updatePermissionAdmin(dto);
  }
}
