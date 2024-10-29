import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Comment } from './entities/comment.entity';
import { PostsModule } from 'src/posts/posts.module';
import { UsersModule } from 'src/users/users.module';
import { RelationshipsModule } from 'src/relationships/relationships.module';
import { GroupUsersModule } from 'src/groupusers/groupusers.module';
import { FunctionHelper } from 'src/helper/helper.function';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    DatabaseModule,
    PostsModule,
    RelationshipsModule,
    GroupUsersModule,
  ],
  controllers: [CommentsController],
  providers: [CommentsService, FunctionHelper],
  exports: [CommentsService],
})
export class CommentsModule {}
