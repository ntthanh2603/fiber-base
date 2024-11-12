import { ConversationsService } from './../conversations/conversations.service';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Body,
} from '@nestjs/common';
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

    console.log('>> check 1');

    await this.conversationsService.findConversionById(body.conversation_id);

    console.log('>> check 2');

    const findMember = await this.conversationMembersService.findMember(
      user.user_id,
      body.conversation_id,
    );

    return findMember ? true : false;
  }
}
