import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MemberType } from 'src/helper/helper.enum';

export class CreateConversationMemberDto {
  @IsString()
  @IsNotEmpty({ message: 'Conversation not null' })
  conversation_id: string;

  @IsString()
  @IsNotEmpty({ message: 'Id by user not null' })
  user_id: string;

  @IsString()
  @IsEnum(MemberType)
  memberType: MemberType;
}
