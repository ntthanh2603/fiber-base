import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AddConversationAdmin {
  @IsString()
  @IsNotEmpty({ message: 'Conversation not null' })
  @IsUUID()
  conversation_id: string;

  @IsString()
  @IsNotEmpty({ message: 'Id by user not null' })
  @IsUUID()
  user_id: string;
}
