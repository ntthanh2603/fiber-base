import { RelationshipType } from 'src/helper/helper.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Relationship {
  @PrimaryGeneratedColumn('uuid')
  relationship_id: string;

  @Column()
  user_id1: string;

  @Column()
  user_id2: string;

  @Column({
    type: 'enum',
    enum: RelationshipType,
  })
  relationship: RelationshipType;
}
