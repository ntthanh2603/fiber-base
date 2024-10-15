import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConversationMember {
  @PrimaryGeneratedColumn()
  conversationMember_id: string;

  @Column()
  conversation: string;

  @Column()
  user_id: string;
}
