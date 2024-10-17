import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  message_id: string;

  @Column()
  user_id: string;

  @Column()
  conversation_id: string;

  @Column()
  message: string;

  @Column()
  time: Date;
}
