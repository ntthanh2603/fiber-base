import { FilesModule } from './../files/files.module';
import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { DatabaseModule } from 'src/database/database.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/files/multer.config';
import { UsersModule } from 'src/users/users.module';
import { FunctionHelper } from 'src/helper/helper.function';
import { GroupUsersModule } from 'src/groupusers/groupusers.module';
import { GroupsModule } from 'src/groups/groups.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    DatabaseModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
    forwardRef(() => GroupUsersModule),
    forwardRef(() => GroupsModule),
  ],
  controllers: [PostsController],
  providers: [PostsService, FunctionHelper],
  exports: [PostsService],
})
export class PostsModule {}
