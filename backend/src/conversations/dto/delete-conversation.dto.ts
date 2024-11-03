import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteConversationDto {
  @IsString()
  @IsNotEmpty()
  conversation_id: string;
}
