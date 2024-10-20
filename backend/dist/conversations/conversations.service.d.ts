import { CreateConversationDto } from './dto/create-conversation.dto';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { IUser } from 'src/users/users.interface';
import { ConversationMembersService } from 'src/conversation-members/conversation-members.service';
export declare class ConversationsService {
    private conversationsRepository;
    private cmService;
    constructor(conversationsRepository: Repository<Conversation>, cmService: ConversationMembersService);
    findConversionById(conversation_id: string): Promise<Conversation>;
    create(user: IUser, dto: CreateConversationDto): Promise<{
        createdBy: string;
        conversation_name: string;
    } & Conversation>;
}
