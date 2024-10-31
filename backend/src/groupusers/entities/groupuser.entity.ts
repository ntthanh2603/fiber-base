import { GroupUserType } from 'src/helper/helper.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GroupUser {
  @PrimaryGeneratedColumn('uuid')
  groupuser_id: string;

  @Column()
  user_id: string;

  @Column()
  group_id: string;

  @Column({ type: 'enum', enum: GroupUserType })
  groupuserType: GroupUserType;
}
