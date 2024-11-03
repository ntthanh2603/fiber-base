import { Module } from '@nestjs/common';

import { Repository } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { ConversationMember } from 'src/conversation-members/entities/conversation-member.entity';
import { ConversationMembersService } from 'src/conversation-members/conversation-members.service';
import { ConversationMembersModule } from 'src/conversation-members/conversation-members.module';
import { ConversationsService } from 'src/conversations/conversations.service';
import { Message } from './entities/messgage.entity';
import { MessagesService } from './messgages.service';
import { MessagesController } from './messgages.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    DatabaseModule,
    ConversationMembersModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
