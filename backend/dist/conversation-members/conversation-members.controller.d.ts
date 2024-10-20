import { ConversationMembersService } from './conversation-members.service';
import { CreateConversationMemberDto } from './dto/create-conversation-member.dto';
export declare class ConversationMembersController {
    private readonly conversationMembersService;
    constructor(conversationMembersService: ConversationMembersService);
    addUser(cmDto: CreateConversationMemberDto): Promise<CreateConversationMemberDto & import("./entities/conversation-member.entity").ConversationMember>;
}
