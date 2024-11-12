import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class CreateConversationDto {
  @IsString()
  @ApiProperty({ example: 'Chat me' })
  conversationName: string;

  @IsString()
  @IsUUID()
  user_id: string;
}
