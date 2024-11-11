import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty({ message: 'conversation_id not null' })
  @IsUUID()
  conversation_id: string;

  @IsString()
  @IsNotEmpty({ message: 'message not null' })
  message: string;
}
