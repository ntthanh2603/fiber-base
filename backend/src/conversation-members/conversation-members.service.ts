import { AddConversationMember } from './dto/add-conversation-member.dto';
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
// import { CreateConversationMemberDto } from './dto/create-conversation-member.dto';
// import { UpdateConversationMemberDto } from './dto/update-conversation-member.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationMember } from './entities/conversation-member.entity';
// import { DeleteConversationMemberDto } from './dto/delete-conversation-member.dto';
import { MemberType } from 'src/helper/helper.enum';
import { AddConversationAdmin } from './dto/add-conversation-admin.dto';

@Injectable()
export class ConversationMembersService {
  constructor(
    @InjectRepository(ConversationMember)
    private cmRepository: Repository<ConversationMember>,
    @Inject(forwardRef(() => ConversationsService))
    private conversationsService: ConversationsService,
  ) {}

  findMember(user_id: string, conversation_id: string) {
    return this.cmRepository.findOne({
      where: {
        user_id: user_id,
        conversation_id: conversation_id,
      },
    });
  }

  async addMember(dto: AddConversationMember) {
    const member = await this.findMember(dto.user_id, dto.conversation_id);
    if (member)
      throw new BadRequestException(
        `${dto.user_id} existes in ${dto.conversation_id}`,
      );

    await this.conversationsService.findConversionById(dto.conversation_id);

    return this.cmRepository.save({
      conversation_id: dto.conversation_id,
      user_id: dto.user_id,
      memberType: MemberType.MEMBER,
    });
  }

  async createAdmin(dto: AddConversationAdmin) {
    await this.conversationsService.findConversionById(dto.conversation_id);

    return this.cmRepository.save({
      conversation_id: dto.conversation_id,
      user_id: dto.user_id,
      memberType: MemberType.ADMIN,
    });
  }

  async updatePermissionAdmin(dto: AddConversationAdmin) {
    const member = await this.findMember(dto.user_id, dto.conversation_id);
    if (!member)
      throw new BadRequestException(
        `${dto.user_id} does not exist in ${dto.conversation_id}`,
      );

    if (member.memberType == MemberType.ADMIN)
      throw new BadRequestException(
        `${dto.user_id} was admin in ${dto.conversation_id}`,
      );

    await this.cmRepository.update(
      { conversationMember_id: member.conversationMember_id },
      { memberType: MemberType.ADMIN },
    );
    return {
      result: `User ${dto.user_id} is the admin of conversation ${dto.conversation_id}`,
    };
  }

  async remoteAllMember(conversation_id) {
    await this.cmRepository.delete({ conversation_id });
    return;
  }
}
