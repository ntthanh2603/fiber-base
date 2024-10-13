import { MaxLength, MinLength } from 'class-validator';
import { GenderType, StatusType } from 'src/helper/helper.enum';
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

  @Column({ default: null })
  refreshToken: string;
}
