import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  conversation_id: string;

  @Column()
  conversation_name: string;

  @Column({ default: 'tuanthanh.img.com' })
  avartar: string;

  @Column()
  createdBy: string;

  @Column()
  createdAt: Date;
}
