import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConversationMembersService } from 'src/conversation-members/conversation-members.service';
import { MemberType } from 'src/helper/helper.enum';

@Injectable()
export class AdminConversationGuard implements CanActivate {
  constructor(private conversationMembersService: ConversationMembersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const body = request.body;

    const findMember = await this.conversationMembersService.findMember(
      user.user_id,
      body.conversation_id,
    );

    if (findMember)
      return findMember.memberType == MemberType.ADMIN ? true : false;
    return false;
  }
}
