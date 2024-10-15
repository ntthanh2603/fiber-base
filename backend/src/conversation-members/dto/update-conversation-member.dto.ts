import { PartialType } from '@nestjs/mapped-types';
import { CreateConversationMemberDto } from './create-conversation-member.dto';

export class UpdateConversationMemberDto extends PartialType(CreateConversationMemberDto) {}
