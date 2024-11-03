import { forwardRef, Module } from '@nestjs/common';
import { ConversationMembersService } from './conversation-members.service';
import { ConversationMembersController } from './conversation-members.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversationMember } from './entities/conversation-member.entity';
import { ConversationsModule } from 'src/conversations/conversations.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConversationMember]),
    DatabaseModule,
    UsersModule,
    forwardRef(() => ConversationsModule),
  ],
  controllers: [ConversationMembersController],
  providers: [ConversationMembersService],
  exports: [ConversationMembersService],
})
export class ConversationMembersModule {}
