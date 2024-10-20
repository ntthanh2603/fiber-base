import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
export declare class MediasService {
    create(createMediaDto: CreateMediaDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateMediaDto: UpdateMediaDto): string;
    remove(id: number): string;
}
