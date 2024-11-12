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
import { MemberType, RelationshipType } from 'src/helper/helper.enum';
import { RelationshipsService } from 'src/relationships/relationships.service';
import * as fs from 'fs';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectRepository(Conversation)
    private conversationsRepository: Repository<Conversation>,
    @Inject(forwardRef(() => ConversationMembersService))
    private cmService: ConversationMembersService,
    private relationshipsService: RelationshipsService,
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
    const relationship = await this.relationshipsService.findRelationship(
      user.user_id,
      dto.user_id,
    );
    if (!relationship)
      throw new BadRequestException(
        `${user.user_id} and ${dto.user_id} not relationship`,
      );

    const conversation = await this.conversationsRepository.save({
      conversationName: dto.conversationName,
      createdBy: user.user_id,
      createdAt: new Date(),
    });

    if (relationship.relationship == RelationshipType.FRIEND) {
      // add admin
      await this.cmService.createAdmin({
        conversation_id: conversation.conversation_id,
        user_id: user.user_id,
      });
      // add user
      await this.cmService.addMember({
        conversation_id: conversation.conversation_id,
        user_id: dto.user_id,
      });

      return conversation;
    } else
      throw new BadRequestException(
        `${user.user_id} and ${dto.user_id} not friend`,
      );
  }

  async remote(user: IUser, dto: DeleteConversationDto) {
    const conversation = await this.conversationsRepository.findOne({
      where: { conversation_id: dto.conversation_id },
    });
    if (!conversation) throw new BadRequestException();

    const permissionUser = await this.cmService.findMember(
      user.user_id,
      conversation.conversation_id,
    );

    if (!permissionUser)
      throw new ForbiddenException(
        `${user.user_id} is not admin conversation ${dto.conversation_id}`,
      );
    else if (permissionUser.memberType == MemberType.MEMBER) {
      throw new ForbiddenException(
        `${user.user_id} is not admin conversation ${dto.conversation_id}`,
      );
    } else {
      await this.cmService.remoteAllMember(dto.conversation_id);

      return await this.conversationsRepository.delete({
        conversation_id: dto.conversation_id,
      });
    }
  }

  async update(dto: UpdateConversationDto, file: Express.Multer.File) {
    const findConversation = await this.findConversionById(dto.conversation_id);

    if (!file) {
      return await this.conversationsRepository.update(
        { conversation_id: dto.conversation_id },
        {
          ...dto,
        },
      );
    }

    const avatar = findConversation.avatar;

    if (avatar) {
      try {
        if (fs.existsSync(avatar)) {
          fs.unlinkSync(avatar);
        }
      } catch (error) {
        console.error('Error deleting old avatar:', error);
      }
    }
    return await this.conversationsRepository.update(
      { conversation_id: dto.conversation_id },
      {
        ...dto,
        avatar: file.path,
      },
    );
  }
}
