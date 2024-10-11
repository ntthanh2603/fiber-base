import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Group {
  @PrimaryColumn()
  id: string;
}
