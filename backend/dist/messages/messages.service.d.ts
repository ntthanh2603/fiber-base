import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
export declare class MessagesService {
    private messagesRepository;
    constructor(messagesRepository: Repository<Message>);
}
