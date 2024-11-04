import { MemberType } from 'src/helper/helper.enum';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class GroupMember {
  @PrimaryGeneratedColumn('uuid')
  groupmember_id: string;

  @Column()
  user_id: string;

  @Column()
  group_id: string;

  @Column({ type: 'enum', enum: MemberType })
  memberType: MemberType;
}
