import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FunctionHelper } from 'src/helper/helper.function';
import { MulterConfigService } from 'src/core/multer.config';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    DatabaseModule,
    MulterModule.registerAsync({
      useClass: MulterConfigService,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, FunctionHelper],
  exports: [UsersService],
})
export class UsersModule {}
