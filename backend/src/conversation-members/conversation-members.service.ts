import { IUser } from './../users/users.interface';
import { ConversationsService } from './../conversations/conversations.service';
import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateConversationMemberDto } from './dto/create-conversation-member.dto';
import { UpdateConversationMemberDto } from './dto/update-conversation-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationMember } from './entities/conversation-member.entity';

@Injectable()
export class ConversationMembersService {
  constructor(
    @InjectRepository(ConversationMember)
    private cmRepository: Repository<ConversationMember>,
    @Inject(forwardRef(() => ConversationsService))
    private conversationsService: ConversationsService,
  ) {}

  async createConversation(cmDto: CreateConversationMemberDto) {
    const conversation = await this.conversationsService.findConversionById(
      cmDto.conversation_id,
    );

    if (conversation)
      return await this.cmRepository.save({
        conversation_id: cmDto.conversation_id,
        user_id: cmDto.user_id,
      });

    throw new NotFoundException('Conversation has existed');
  }

  async addUser(cmDto: CreateConversationMemberDto) {
    const conversation = await this.conversationsService.findConversionById(
      cmDto.conversation_id,
    );

    if (conversation) return this.cmRepository.save(cmDto);

    throw new NotFoundException('Conversation does not exist');
  }
}
