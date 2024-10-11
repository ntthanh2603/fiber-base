import { MaxLength, MinLength } from 'class-validator';
import { GenderType, StatusType, UserType } from 'src/helper/helper.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { UpsertType } from 'typeorm/driver/types/UpsertType';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @MinLength(8)
  @MaxLength(10)
  password: string;

  @Column({ default: null })
  avartar: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'enum', enum: GenderType })
  gender: GenderType;

  @Column()
  address: string;

  @Column({ default: null })
  description: string;

  @Column({ type: 'enum', enum: StatusType, default: StatusType.OFF })
  status: StatusType;

  @Column({ type: 'enum', enum: UserType, default: UserType.USER })
  role: UserType;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column({ default: null })
  refreshToken: string;
}
