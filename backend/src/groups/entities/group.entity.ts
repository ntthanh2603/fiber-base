import { PrivacyType } from 'src/helper/helper.enum';
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

  @Column({
    type: 'enum',
    enum: PrivacyType,
  })
  privacy: PrivacyType;

  @Column()
  createdAt: Date;

  @Column({ default: null })
  updatedAt: Date;

  @Column()
  createdBy: string;

  @Column({ default: null })
  updatedBy: string;
}
