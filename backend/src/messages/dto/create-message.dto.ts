import { IsNotEmpty } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty({ message: 'user_id not null' })
  user_id: string;

  @IsNotEmpty({ message: 'conversation_id not null' })
  conversation_id: string;

  @IsNotEmpty({ message: 'message not null' })
  message: string;

  @IsNotEmpty({ message: 'time not null' })
  time: Date;
}
