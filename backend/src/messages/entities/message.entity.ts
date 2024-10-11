import { Entity, PrimaryColumn } from 'typeorm';

@Entity('messages')
export class Message {
  @PrimaryColumn()
  id: string;
}
