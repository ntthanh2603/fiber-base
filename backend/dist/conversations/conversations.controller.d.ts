import { ConversationsService } from './conversations.service';
import { IUser } from 'src/users/users.interface';
import { CreateConversationDto } from './dto/create-conversation.dto';
export declare class ConversationsController {
    private readonly conversationsService;
    constructor(conversationsService: ConversationsService);
    creare(user: IUser, dto: CreateConversationDto): Promise<{
        createdBy: string;
        conversation_name: string;
    } & import("./entities/conversation.entity").Conversation>;
}
