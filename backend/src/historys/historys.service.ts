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

  async isDeleted(history: IHistory) {
    const user = await this.historysRepository.findOneBy({
      target_id: history.target_id,
      role: history.role,
    });
    return user.deletedAt ? true : false;
  }

  async updateHistory(updateDto: UpdateHistoryDto) {
    const { target_id, updatedAt, updatedBy, role } = updateDto;
    const history = await this.historysRepository.findOneBy({
      target_id: target_id,
      role: role,
    });

    history.deletedAt = updatedAt;
    history.deletedBy = updatedBy;
    return await this.historysRepository.save(history);
  }

  async deleteHistory(deleteDdto: DeleteHistoryDto) {
    const { target_id, deletedAt, deletedBy, role } = deleteDdto;
    const history = await this.historysRepository.findOneBy({
      target_id: target_id,
      role: role,
    });

    history.deletedAt = deletedAt;
    history.deletedBy = deletedBy;
    return await this.historysRepository.save(history);
  }
}
