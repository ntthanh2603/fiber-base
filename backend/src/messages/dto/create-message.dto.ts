import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty({ message: 'conversation_id not null' })
  conversation_id: string;

  @IsNotEmpty({ message: 'message not null' })
  message: string;
}
