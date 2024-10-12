import { RelationshipType } from 'src/helper/helper.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Relationship {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user1_id: string;

  @Column()
  user2_id: string;

  @Column({
    type: 'enum',
    enum: RelationshipType,
    default: RelationshipType.NULL,
  })
  relationship: RelationshipType;
}
