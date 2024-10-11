import { Entity, PrimaryColumn } from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryColumn()
  id: string;
}
