import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryColumn()
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
