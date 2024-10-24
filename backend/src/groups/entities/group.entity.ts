import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  group_id: string;

  @Column()
  groupname: string;

  @Column()
  description: string;

  @Column({ default: null })
  avartar: string;

  @Column()
  createdAt: Date;

  @Column({ default: null })
  updatedAt: Date;

  @Column()
  createdBy: string;

  @Column({ default: null })
  updatedBy: string;
}
