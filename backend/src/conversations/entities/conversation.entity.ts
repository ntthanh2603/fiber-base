import { PrivacyType } from 'src/helper/helper.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn('uuid')
  conversation_id: string;

  @Column()
  conversationName: string;

  @Column({ default: 'tuanthanh.img.com' })
  avatar: string;

  @Column()
  createdBy: string;

  @Column()
  createdAt: Date;

  @Column({ default: PrivacyType.PUBLIC })
  privacy: PrivacyType;
}
