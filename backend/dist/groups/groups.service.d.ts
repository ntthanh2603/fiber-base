import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupsService {
    create(createGroupDto: CreateGroupDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateGroupDto: UpdateGroupDto): string;
    remove(id: number): string;
}
