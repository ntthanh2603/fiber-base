import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  message_id: string;

  @Column()
  createdBy: string;

  @Column()
  conversation_id: string;

  @Column()
  message: string;

  @Column()
  createdAt: Date;
}
