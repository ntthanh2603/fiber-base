import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateConversationDto {
  @IsString()
  @IsNotEmpty()
  conversation_id: string;

  @IsString()
  @IsOptional()
  conversation_name: string;

  @IsString()
  @IsOptional()
  avartar: string;
}
