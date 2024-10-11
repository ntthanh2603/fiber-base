import { Entity, PrimaryColumn } from 'typeorm';

@Entity('reactions')
export class Reaction {
  @PrimaryColumn()
  id: string;
}
