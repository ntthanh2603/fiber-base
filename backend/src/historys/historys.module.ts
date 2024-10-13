import { Module } from '@nestjs/common';
import { HistorysService } from './historys.service';
import { HistorysController } from './historys.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';

@Module({
  imports: [TypeOrmModule.forFeature([History]), DatabaseModule],
  controllers: [HistorysController],
  providers: [HistorysService],
  exports: [HistorysService],
})
export class HistorysModule {}
