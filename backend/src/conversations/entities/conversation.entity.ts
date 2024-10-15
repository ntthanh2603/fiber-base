import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  conversation_id: string;

  @Column({ default: null })
  conversation_name: string;

  @Column({ default: null })
  avartar: string;

  @Column()
  createdBy: string;
}
