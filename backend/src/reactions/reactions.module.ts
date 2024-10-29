import { Module } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from './entities/reaction.entity';
import { DatabaseModule } from 'src/database/database.module';
import { FunctionHelper } from 'src/helper/helper.function';
import { CommentsModule } from 'src/comments/comments.module';
import { PostsModule } from 'src/posts/posts.module';
import { RelationshipsModule } from 'src/relationships/relationships.module';
import { GroupUsersModule } from 'src/groupusers/groupusers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reaction]),
    DatabaseModule,
    CommentsModule,
    PostsModule,
    RelationshipsModule,
    GroupUsersModule,
  ],
  controllers: [ReactionsController],
  providers: [ReactionsService, FunctionHelper],
})
export class ReactionsModule {}
