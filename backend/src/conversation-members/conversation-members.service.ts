import { IUser } from 'src/users/users.interface';
import { ConversationsService } from './../conversations/conversations.service';
import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConversationMember } from './entities/conversation-member.entity';
import { MemberType } from 'src/helper/helper.enum';
import { ConversationMemberDto } from './dto/conversation-member.dto';

@Injectable()
export class ConversationMembersService {
  constructor(
    @InjectRepository(ConversationMember)
    private conversationMembersRepository: Repository<ConversationMember>,
    @Inject(forwardRef(() => ConversationsService))
    private conversationsService: ConversationsService,
  ) {}

  findMember(user_id: string, conversation_id: string) {
    return this.conversationMembersRepository.findOne({
      where: {
        user_id: user_id,
        conversation_id: conversation_id,
      },
    });
  }

  async addMember(dto: ConversationMemberDto) {
    const member = await this.findMember(dto.user_id, dto.conversation_id);
    if (member)
      throw new BadRequestException(
        `${dto.user_id} existes in ${dto.conversation_id}`,
      );

    await this.conversationsService.findConversionById(dto.conversation_id);

    return this.conversationMembersRepository.save({
      conversation_id: dto.conversation_id,
      user_id: dto.user_id,
      memberType: MemberType.MEMBER,
    });
  }

  async createAdmin(dto: ConversationMemberDto) {
    await this.conversationsService.findConversionById(dto.conversation_id);

    return this.conversationMembersRepository.save({
      conversation_id: dto.conversation_id,
      user_id: dto.user_id,
      memberType: MemberType.ADMIN,
    });
  }

  remoteAllMember(conversation_id: string) {
    return this.conversationMembersRepository.delete({ conversation_id });
  }

  async checkPermission(
    user_id: string,
    conversation_id: string,
    memberType: MemberType,
  ) {
    const conversationMember = await this.findMember(user_id, conversation_id);

    if (!conversationMember)
      throw new NotFoundException(
        `User ${user_id} isn't conversation member ${conversation_id}`,
      );
    else if (conversationMember.memberType == memberType)
      return conversationMember;
    else throw new ForbiddenException(`User isn't ${memberType}`);
  }

  async deleteMember(dto: ConversationMemberDto) {
    await this.checkPermission(
      dto.user_id,
      dto.conversation_id,
      MemberType.MEMBER,
    );
    return await this.conversationMembersRepository.delete({
      user_id: dto.user_id,
      conversation_id: dto.conversation_id,
    });
  }

  async deleteAdmin(dto: ConversationMemberDto) {
    await this.checkPermission(
      dto.user_id,
      dto.conversation_id,
      MemberType.ADMIN,
    );
    return await this.conversationMembersRepository.delete({
      user_id: dto.user_id,
      conversation_id: dto.conversation_id,
    });
  }

  async updatePermissionAdmin(dto: ConversationMemberDto) {
    await this.checkPermission(
      dto.user_id,
      dto.conversation_id,
      MemberType.MEMBER,
    );

    return await this.conversationMembersRepository.update(
      { conversation_id: dto.conversation_id, user_id: dto.user_id },
      { memberType: MemberType.ADMIN },
    );
  }

  async updatePermissionUser(dto: ConversationMemberDto) {
    await this.checkPermission(
      dto.user_id,
      dto.conversation_id,
      MemberType.ADMIN,
    );
    return await this.conversationMembersRepository.update(
      { conversation_id: dto.conversation_id, user_id: dto.user_id },
      { memberType: MemberType.MEMBER },
    );
  }
}
