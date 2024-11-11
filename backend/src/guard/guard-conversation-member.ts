import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConversationMembersService } from 'src/conversation-members/conversation-members.service';

@Injectable()
export class MemberConversationGuard implements CanActivate {
  constructor(private conversationMembersService: ConversationMembersService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log(request);

    // const findMember = await this.conversationMembersService.

    return false;
  }
}
