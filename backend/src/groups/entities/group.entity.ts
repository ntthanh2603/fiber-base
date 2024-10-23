import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  group_id: string;

  @Column()
  group_name: string;

  @Column()
  description: string;

  @Column()
  avartar: string;

  @Column()
  createdAt: Date;

  @Column({ default: null })
  updatedAt: Date;

  @Column({ default: null })
  deletedAt: Date;

  @Column()
  createdBy: string;

  @Column({ default: null })
  updatedBy: string;

  @Column({ default: null })
  deletedBy: string;
}
