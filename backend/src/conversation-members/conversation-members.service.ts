import { Conversation } from './../conversations/entities/conversation.entity';
import { UsersService } from 'src/users/users.service';
import { IUser } from './../users/users.interface';
import { ConversationsService } from './../conversations/conversations.service';
import {
  BadRequestException,
  ForbiddenException,
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
import { DeleteConversationMemberDto } from './dto/delete-conversation-member.dto';

@Injectable()
export class ConversationMembersService {
  constructor(
    @InjectRepository(ConversationMember)
    private cmRepository: Repository<ConversationMember>,
    @Inject(forwardRef(() => ConversationsService))
    private conversationsService: ConversationsService,
    private usersService: UsersService,
  ) {}

  // async createConversation(dto: CreateConversationMemberDto) {
  //   const conversation = await this.conversationsService.findConversionById(
  //     dto.conversation_id,
  //   );

  //   const user = await this.usersService.findUserById(dto.user_id);
  //   if (conversation && user)
  //     return await this.cmRepository.save({
  //       conversation_id: dto.conversation_id,
  //       user_id: dto.user_id,
  //     });

  //   throw new NotFoundException('Conversation has existed');
  // }

  async addMember(cmDto: CreateConversationMemberDto) {
    const conversation = await this.conversationsService.findConversionById(
      cmDto.conversation_id,
    );

    if (conversation) return this.cmRepository.save(cmDto);

    throw new NotFoundException('Conversation does not exist');
  }

  async checkUserInConversation(user_id: string, conversation_id: string) {
    const cm = await this.cmRepository.findOne({
      where: { user_id, conversation_id },
    });
    return cm ? true : false;
  }

  async remote(user: IUser, deleteDto: DeleteConversationMemberDto) {
    try {
      const conversation = await this.conversationsService.findConversionById(
        deleteDto.conversation_id,
      );

      if (user.user_id == conversation.createdBy) {
        throw new ForbiddenException();
      }
      const check = this.cmRepository.findOne({
        where: {
          user_id: user.user_id,
          conversation_id: deleteDto.conversation_id,
        },
      });
      if (check)
        return await this.cmRepository.delete({
          user_id: user.user_id,
          conversation_id: deleteDto.conversation_id,
        });
    } catch (e) {
      throw new BadRequestException();
    }
  }
}
