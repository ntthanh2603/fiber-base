import { ReactionPostType, ReactionType } from 'src/helper/helper.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
    enum: ReactionPostType,
  })
  reactionType: ReactionPostType;

  @Column({
    type: 'enum',
    enum: ReactionType,
  })
  reaction: ReactionType;
}
