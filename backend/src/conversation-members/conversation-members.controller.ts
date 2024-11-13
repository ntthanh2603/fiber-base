import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Delete,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { ConversationMembersService } from './conversation-members.service';
import { ApiTags } from '@nestjs/swagger';
import { MemberConversationGuard } from 'src/guard/guard-conversation-member';
import { FriendRelationshipGuard } from 'src/guard/guard-relationship-friend';
import { AdminConversationGuard } from 'src/guard/guard-conversation-admin';
import { ConversationMemberDto } from './dto/conversation-member.dto';
import { CreatorConversationGuard } from 'src/guard/guard-conversation-creator';
import { IUser } from 'src/users/users.interface';
import { User } from 'src/decorator/customize';

@ApiTags('Conversation members')
@Controller('conversation-members')
export class ConversationMembersController {
  constructor(
    private readonly conversationMembersService: ConversationMembersService,
  ) {}

  @Post('add-member')
  // @UseGuards(FriendRelationshipGuard)
  @UseGuards(MemberConversationGuard)
  addMember(@Body() dto: ConversationMemberDto) {
    return this.conversationMembersService.addMember(dto);
  }

  @Patch('update-permission-admin')
  @UseGuards(AdminConversationGuard)
  updatePermissionAdmin(@Body() dto: ConversationMemberDto) {
    return this.conversationMembersService.updatePermissionAdmin(dto);
  }

  @Patch('update-permession-user')
  @UseGuards(CreatorConversationGuard)
  updatePermissionUser(
    @User() user: IUser,
    @Body() dto: ConversationMemberDto,
  ) {
    if (user.user_id == dto.user_id)
      throw new BadRequestException('Cannot be update permission creator');
    return this.conversationMembersService.updatePermissionUser(dto);
  }

  @Delete('delete-member')
  @UseGuards(AdminConversationGuard)
  deleteMember(@Body() dto: ConversationMemberDto) {
    return this.conversationMembersService.deleteMember(dto);
  }

  @Delete('delete-admin')
  @UseGuards(CreatorConversationGuard)
  deleteAdmin(@User() user: IUser, @Body() dto: ConversationMemberDto) {
    if (user.user_id == dto.user_id)
      throw new BadRequestException('Cannot be delete creator');
    return this.conversationMembersService.deleteAdmin(dto);
  }
}
