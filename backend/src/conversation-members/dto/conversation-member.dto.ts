import { IsUUID } from 'class-validator';

export class ConversationMemberDto {
  @IsUUID()
  conversation_id: string;

  @IsUUID()
  user_id: string;
}
