import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConversationMemberDto {
  @IsString()
  @IsNotEmpty({ message: 'Conversation not null' })
  conversation_id: string;

  @IsString()
  @IsNotEmpty({ message: 'Id by user not null' })
  user_id: string;
}
