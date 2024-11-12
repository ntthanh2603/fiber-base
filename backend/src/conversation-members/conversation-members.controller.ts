import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { ConversationMembersService } from './conversation-members.service';
import { ApiTags } from '@nestjs/swagger';
import { MemberConversationGuard } from 'src/guard/guard-conversation-member';
import { FriendRelationshipGuard } from 'src/guard/guard-relationship-friend';
import { AdminConversationGuard } from 'src/guard/guard-conversation-admin';
import { ConversationMemberDto } from './dto/conversation-member.dto';

@ApiTags('Conversation members')
@Controller('conversation-members')
export class ConversationMembersController {
  constructor(
    private readonly conversationMembersService: ConversationMembersService,
  ) {}

  @Post('add-member')
  @UseGuards(FriendRelationshipGuard)
  @UseGuards(MemberConversationGuard)
  addMember(@Body() dto: ConversationMemberDto) {
    return this.conversationMembersService.addMember(dto);
  }

  @Patch('add-admin')
  @UseGuards(AdminConversationGuard)
  addAdmin(@Body() dto: ConversationMemberDto) {
    return this.conversationMembersService.updatePermissionAdmin(dto);
  }

  @Delete('admin-delete-member')
  @UseGuards(AdminConversationGuard)
  adminDeleteMember(@Body() dto: ConversationMemberDto) {
    return this.conversationMembersService.adminDeleteMember(dto);
  }
}
