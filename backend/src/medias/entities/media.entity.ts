import { Entity, PrimaryColumn } from 'typeorm';

@Entity('media')
export class Media {
  @PrimaryColumn()
  id: string;
}
