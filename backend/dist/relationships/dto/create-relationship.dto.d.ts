import { RelationshipType } from 'src/helper/helper.enum';
export declare class CreateRelationshipDto {
    user1_id: string;
    user2_id: string;
    relationship: RelationshipType;
}
