import { ConversationsService } from './../conversations/conversations.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { isUUID } from 'class-validator';
import { ConversationMembersService } from 'src/conversation-members/conversation-members.service';

@Injectable()
export class MemberConversationGuard implements CanActivate {
  constructor(
    private conversationMembersService: ConversationMembersService,
    private conversationsService: ConversationsService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const body = request.body;

    if (!isUUID(body.conversation_id, '4') || !isUUID(user.user_id, '4')) {
      return false;
    }

    await this.conversationsService.findConversionById(body.conversation_id);

    const findMember = await this.conversationMembersService.findMember(
      user.user_id,
      body.conversation_id,
    );

    return findMember ? true : false;
  }
}
