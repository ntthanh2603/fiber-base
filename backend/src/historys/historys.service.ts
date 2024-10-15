import { Injectable } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './entities/history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteHistoryDto } from './dto/delete-history.dto';
import { IHistory } from './history.interface';

@Injectable()
export class HistorysService {
  constructor(
    @InjectRepository(History)
    private historysRepository: Repository<History>,
  ) {}
  async createHistoty(history: CreateHistoryDto) {
    return await this.historysRepository.save(history);
  }

  async isDeleted(ihistory: IHistory) {
    const history = await this.historysRepository.findOneBy({
      target_id: ihistory.target_id,
      role: ihistory.role,
    });
    return history;
  }

  async updateHistory(updateDto: UpdateHistoryDto) {
    const { target_id, updatedAt, updatedBy, role } = updateDto;
    const history = await this.historysRepository.findOneBy({
      target_id: target_id,
      role: role,
    });

    history.updatedAt = updatedAt;
    history.updatedBy = updatedBy;
    return await this.historysRepository.save(history);
  }

  async deleteHistory(deleteDto: DeleteHistoryDto) {
    const { target_id, deletedAt, deletedBy, role } = deleteDto;

    return await this.historysRepository.update(
      {
        target_id,
        role: role,
      },
      {
        deletedAt,
        deletedBy,
      },
    );
  }
}
