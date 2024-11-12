import { ConversationsService } from './../conversations/conversations.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class CreatorConversationGuard implements CanActivate {
  constructor(private conversationsService: ConversationsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const body = request.body;

    const creator = await this.conversationsService.findConversionById(
      body.conversation_id,
    );

    return creator.createdBy == user.user_id ? true : false;
  }
}
