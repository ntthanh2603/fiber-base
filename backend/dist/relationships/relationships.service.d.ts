import { UsersService } from './../users/users.service';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { Relationship } from './entities/relationship.entity';
import { Repository } from 'typeorm';
export declare class RelationshipsService {
    private relationshipsRepository;
    private usersService;
    constructor(relationshipsRepository: Repository<Relationship>, usersService: UsersService);
    relationshipUser(createRelationshipDto: CreateRelationshipDto): Promise<{
        result: {
            message: string;
            user1: {
                user_id: string;
                username: string;
            };
            user2: {
                user_id: string;
                username: string;
            };
            relationshipUpdate: import("../helper/helper.enum").RelationshipType;
        };
    }>;
}
