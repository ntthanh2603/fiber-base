import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty({ message: 'conversation_id not null' })
  conversation_id: string;

  @IsString()
  @IsNotEmpty({ message: 'message not null' })
  message: string;
}
