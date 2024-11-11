import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class DeleteConversationMemberDto {
  @IsString()
  @IsNotEmpty({ message: 'Conversation not null' })
  @IsUUID()
  conversation_id: string;
}
