import { MaxLength, MinLength } from 'class-validator';
import { GenderType, PrivacyType, StatusType } from 'src/helper/helper.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @MinLength(8)
  @MaxLength(10)
  password: string;

  @Column({ default: null })
  avatar: string;

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

  @Column({ default: null })
  refreshToken: string;

  @Column()
  createdAt: Date;

  @Column({ default: null })
  updatedAt: Date;

  @Column({ default: null })
  deletedAt: Date;

  @Column({ type: 'enum', enum: PrivacyType, default: PrivacyType.PUBLIC })
  privacy: PrivacyType;
}
