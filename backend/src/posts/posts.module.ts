import { FilesModule } from './../files/files.module';
import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { DatabaseModule } from 'src/database/database.module';
import { MulterModule } from '@nestjs/platform-express';
import { MulterConfigService } from 'src/files/multer.config';
import { UsersModule } from 'src/users/users.module';
import { FunctionHelper } from 'src/helper/helper.function';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post]),
    DatabaseModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [PostsController],
  providers: [PostsService, FunctionHelper],
  exports: [PostsService],
})
export class PostsModule {}
