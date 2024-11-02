import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRelationshipDto {
  @IsNotEmpty({ message: 'ID user 2 not null' })
  @IsString()
  user_id2: string;
}
