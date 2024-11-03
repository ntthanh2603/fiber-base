import { forwardRef, Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Conversation } from './entities/conversation.entity';
import { ConversationMembersModule } from 'src/conversation-members/conversation-members.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    DatabaseModule,
    forwardRef(() => ConversationMembersModule),
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService],
  exports: [ConversationsService],
})
export class ConversationsModule {}
