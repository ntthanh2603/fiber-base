import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Hagtag {
  @PrimaryGeneratedColumn('uuid')
  hagtag_id: string;

  @Column()
  post_id: string;

  @Column()
  hagtag: string;
}
