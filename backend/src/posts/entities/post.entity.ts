import { PostType, PrivacyType } from './../../helper/helper.enum';
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
    enum: PostType,
  })
  postType: PostType;

  @Column({ default: null })
  media: string;

  @Column({
    type: 'enum',
    enum: PrivacyType,
  })
  privacyType: PrivacyType;

  @Column()
  createdAt: Date;

  @Column()
  createdBy: string;
}
