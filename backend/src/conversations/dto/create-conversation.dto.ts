import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateConversationDto {
  @IsString()
  @ApiProperty({ example: 'Chat me' })
  conversationName: string;

  @IsString()
  userOther_id: string;
}
