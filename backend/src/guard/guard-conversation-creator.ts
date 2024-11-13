import { isUUID } from 'class-validator';
import { ConversationsService } from './../conversations/conversations.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class CreatorConversationGuard implements CanActivate {
  constructor(private conversationsService: ConversationsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const body = request.body;

    if (!isUUID(body.conversation_id, '4') || !isUUID(user.user_id, '4')) {
      return false;
    }

    const creator = await this.conversationsService.findConversionById(
      body.conversation_id,
    );

    return creator.createdBy == user.user_id ? true : false;
  }
}
