import { ConversationsService } from './../conversations/conversations.service';
import { CreateConversationMemberDto } from './dto/create-conversation-member.dto';
import { Repository } from 'typeorm';
import { ConversationMember } from './entities/conversation-member.entity';
export declare class ConversationMembersService {
    private cmRepository;
    private conversationsService;
    constructor(cmRepository: Repository<ConversationMember>, conversationsService: ConversationsService);
    createConversation(cmDto: CreateConversationMemberDto): Promise<{
        conversation_id: string;
        user_id: string;
    } & ConversationMember>;
    addUser(cmDto: CreateConversationMemberDto): Promise<CreateConversationMemberDto & ConversationMember>;
}
