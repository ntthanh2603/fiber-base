import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddConversationMember {
  @IsUUID('4', { message: 'format id is uuid' })
  conversation_id: string;

  @IsUUID()
  user_id: string;
}
