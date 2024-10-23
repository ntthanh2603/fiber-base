import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: string;

  @Column()
  user_id: string;

  @Column()
  post_id: string;

  @Column()
  content: string;
}
