import { IsUUID } from 'class-validator';

export class ConversationMemberDto {
  @IsUUID('4')
  conversation_id: string;

  @IsUUID()
  user_id: string;
}
