import { Module } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reaction } from './entities/reaction.entity';
import { DatabaseModule } from 'src/database/database.module';
import { FunctionHelper } from 'src/helper/helper.function';

@Module({
  imports: [TypeOrmModule.forFeature([Reaction]), DatabaseModule],
  controllers: [ReactionsController],
  providers: [ReactionsService, FunctionHelper],
})
export class ReactionsModule {}
