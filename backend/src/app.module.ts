import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GroupsModule } from './groups/groups.module';
import { PostsModule } from './posts/posts.module';
import { MessagesModule } from './messages/messages.module';
import { ReactionsModule } from './reactions/reactions.module';
import { CommentsModule } from './comments/comments.module';
import { DatabaseModule } from 'src/database/database.module';
import { AuthModule } from './auth/auth.module';
import { RelationshipsModule } from './relationships/relationships.module';
import { ConversationMembersModule } from './conversation-members/conversation-members.module';
import { ConversationsModule } from './conversations/conversations.module';
import { UsergroupModule } from './usergroup/usergroup.module';
import { UsergroupsModule } from './usergroups/usergroups.module';
import { HagtafsModule } from './hagtafs/hagtafs.module';
import { HagtagsModule } from './hagtags/hagtags.module';
import { MediasModule } from './medias/medias.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Để module config có thể sử dụng ở mọi nơi mà không cần import lại
      envFilePath: '.env', // Đường dẫn tới file .env
    }),
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    GroupsModule,
    PostsModule,
    MessagesModule,
    ReactionsModule,
    CommentsModule,
    AuthModule,
    RelationshipsModule,
    ConversationMembersModule,
    ConversationsModule,
    UsergroupModule,
    UsergroupsModule,
    HagtafsModule,
    HagtagsModule,
    MediasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
