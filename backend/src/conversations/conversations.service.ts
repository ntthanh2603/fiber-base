import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from './entities/conversation.entity';
import { IUser } from 'src/users/users.interface';
import { ConversationMembersService } from 'src/conversation-members/conversation-members.service';
import { DeleteConversationDto } from './dto/delete-conversation.dto';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationsRepository: Repository<Conversation>,
    @Inject(forwardRef(() => ConversationMembersService))
    private cmService: ConversationMembersService,
  ) {}

  // find conversation by id
  async findConversionById(conversation_id: string) {
    const conversation = await this.conversationsRepository.findOneBy({
      conversation_id,
    });
    if (conversation) return conversation;
    throw new NotFoundException('Conversation not found');
  }

  async create(user: IUser, dto: CreateConversationDto) {
    const createdBy = user.user_id;
    const conversation = await this.conversationsRepository.save({
      conversation_name: dto.conversation_name,
      createdBy: createdBy,
    });

    await this.cmService.createConversation({
      conversation_id: conversation.conversation_id,
      user_id: conversation.createdBy,
    });
    return conversation;
  }

  async remote(user: IUser, dto: DeleteConversationDto) {
    const conversation = await this.conversationsRepository.findOne({
      where: { conversation_id: dto.conversation_id },
    });
    if (user.user_id != conversation.createdBy) throw new ForbiddenException();
    if (conversation) {
      return this.conversationsRepository.delete({
        conversation_id: dto.conversation_id,
      });
    }
    throw new BadRequestException();
  }

  async update(user: IUser, updateDto: UpdateConversationDto) {
    try {
      const conversation = await this.conversationsRepository.findOne({
        where: { conversation_id: updateDto.conversation_id },
      });
    } catch {
      throw new NotFoundException();
    }

    const isInConversation = await this.cmService.checkUserInConversation(
      user.user_id,
      updateDto.conversation_id,
    );
    if (isInConversation) {
      return await this.conversationsRepository.update(
        { conversation_id: updateDto.conversation_id },
        { ...updateDto },
      );
    }

    throw new ForbiddenException();
  }
}
