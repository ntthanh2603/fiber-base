import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateConversationDto {
  @IsString()
  @IsNotEmpty()
  conversation_id: string;

  @IsString()
  @IsOptional()
  conversationName: string;
}
