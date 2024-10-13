import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './entities/history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class HistorysService {
  constructor(
    @InjectRepository(History)
    private historysRepository: Repository<History>,
  ) {}
  async createHistoty(history: CreateHistoryDto) {
    // const { target_id, createdBy, createdAt, role } = history;

    console.log('>>>history', history);

    // const newHistory = {
    //   target_id,
    //   createdBy,
    //   createdAt,
    //   role,
    // };

    return await this.historysRepository.save(history);
  }
}
