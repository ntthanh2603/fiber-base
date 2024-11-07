import { forwardRef, Module } from '@nestjs/common';
import { ConversationsService } from './conversations.service';
import { ConversationsController } from './conversations.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Conversation } from './entities/conversation.entity';
import { ConversationMembersModule } from 'src/conversation-members/conversation-members.module';
import { RelationshipsModule } from 'src/relationships/relationships.module';
import { FunctionHelper } from 'src/helper/helper.function';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/core/multer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Conversation]),
    DatabaseModule,
    forwardRef(() => ConversationMembersModule),
    RelationshipsModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [ConversationsController],
  providers: [ConversationsService, FunctionHelper],
  exports: [ConversationsService],
})
export class ConversationsModule {}
