import { IsUUID } from 'class-validator';

export class ConversationMemberDto {
  @IsUUID('4', { message: 'format id is uuid' })
  conversation_id: string;

  @IsUUID()
  user_id: string;
}
