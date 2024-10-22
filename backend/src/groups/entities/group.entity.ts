import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
