import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  conversation_id: string;

  @Column()
  conversationName: string;

  @Column({
    default:
      'C:Codeproject-social-spaces/backend/public/images/default/avatar-conversation.jpg',
  })
  avatar: string;

  @Column()
  createdBy: string;

  @Column()
  createdAt: Date;
}
