import { Entity, PrimaryColumn } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryColumn()
  id: string;
}
