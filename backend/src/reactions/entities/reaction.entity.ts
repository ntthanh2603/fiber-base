import { ReactionType, RoleType } from 'src/helper/helper.enum';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('reactions')
export class Reaction {
  @PrimaryGeneratedColumn()
  reaction_id: string;

  @Column()
  user_id: string;

  @Column()
  target_id: string;

  @Column({
    type: 'enum',
    enum: RoleType,
  })
  role: RoleType;

  @Column({
    type: 'enum',
    enum: ReactionType,
  })
  reaction: ReactionType;
}
