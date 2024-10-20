import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';
export declare class ReactionsController {
    private readonly reactionsService;
    constructor(reactionsService: ReactionsService);
    create(createReactionDto: CreateReactionDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateReactionDto: UpdateReactionDto): string;
    remove(id: string): string;
}
