import { MediasService } from './medias.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
export declare class MediasController {
    private readonly mediasService;
    constructor(mediasService: MediasService);
    create(createMediaDto: CreateMediaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMediaDto: UpdateMediaDto): string;
    remove(id: string): string;
}
