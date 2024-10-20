import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './entities/history.entity';
import { Repository } from 'typeorm';
import { DeleteHistoryDto } from './dto/delete-history.dto';
import { IHistory } from './history.interface';
export declare class HistorysService {
    private historysRepository;
    constructor(historysRepository: Repository<History>);
    createHistoty(history: CreateHistoryDto): Promise<CreateHistoryDto & History>;
    isDeleted(ihistory: IHistory): Promise<History>;
    updateHistory(updateDto: UpdateHistoryDto): Promise<History>;
    deleteHistory(deleteDto: DeleteHistoryDto): Promise<import("typeorm").UpdateResult>;
}
