import { RoleType } from 'src/helper/helper.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn('uuid')
  post_id: string;

  @Column()
  target_id: string;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: RoleType,
  })
  role: RoleType;

  @Column({ default: null })
  media: string;

  @Column()
  createdAt: Date;

  @Column()
  createdBy: string;
}
