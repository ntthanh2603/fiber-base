import { RelationshipsService } from './relationships.service';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
export declare class RelationshipsController {
    private readonly relationshipsService;
    constructor(relationshipsService: RelationshipsService);
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
