import { MaxLength, MinLength } from 'class-validator';
import { GenderType, PrivacyType, StatusType } from 'src/helper/helper.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @Column({ default: null })
  avatar: string;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column({ default: null })
  bio: string;

  @Column({ default: null })
  website: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'enum', enum: GenderType })
  gender: GenderType;

  @Column()
  address: string;

  @Column({ type: 'enum', enum: PrivacyType, default: PrivacyType.PUBLIC })
  privacy: PrivacyType;

  @Column()
  follower_count: number;

  @Column()
  followed_count: number;

  @Column()
  createdAt: Date;

  @Column({ default: null })
  updatedAt: Date;

  @Column({ type: 'enum', enum: StatusType, default: StatusType.OFF })
  status: StatusType;

  @Column({ default: null })
  refreshToken: string;
}
