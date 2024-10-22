import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteConversationMemberDto {
  @IsString()
  @IsNotEmpty({ message: 'Conversation not null' })
  conversation_id: string;
}
