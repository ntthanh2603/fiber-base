import { IsNotEmpty } from 'class-validator';
import { RelationshipType } from 'src/helper/helper.enum';

export class CreateRelationshipDto {
  @IsNotEmpty({ message: 'ID user 1 not null' })
  user1_id: string;

  @IsNotEmpty({ message: 'ID user 2 not null' })
  user2_id: string;

  @IsNotEmpty({ message: 'Relationship not null' })
  relationship: RelationshipType;
}
