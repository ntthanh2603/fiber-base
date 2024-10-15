import { IsNotEmpty } from 'class-validator';

export class CreateConversationMemberDto {
  @IsNotEmpty({ message: 'Conversation not null' })
  conversation_id: string;

  @IsNotEmpty({ message: 'Id by user not null' })
  user_id: string;
}
