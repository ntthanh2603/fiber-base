import { RoleType } from 'src/helper/helper.enum';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Usergroup {
  @PrimaryGeneratedColumn('uuid')
  usergroup_id: string;

  @Column()
  user_id: string;

  @Column()
  group_id: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;
}
