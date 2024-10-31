import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  comment_id: string;

  @Column()
  post_id: string;

  @Column()
  content: string;

  @Column()
  createdBy: string;

  @Column()
  createdAt: string;
}
