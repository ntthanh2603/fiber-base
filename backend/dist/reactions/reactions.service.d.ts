import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
export declare class ReactionsService {
    create(createReactionDto: CreateReactionDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateReactionDto: UpdateReactionDto): string;
    remove(id: number): string;
}
