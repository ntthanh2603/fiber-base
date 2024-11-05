import { MemberType } from './../../helper/helper.enum';
import { Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ConversationMember {
  @PrimaryGeneratedColumn('uuid')
  conversationMember_id: string;

  @Column()
  conversation_id: string;

  @Column()
  user_id: string;

  @Column({ type: 'enum', enum: MemberType })
  memberType: MemberType;
}
