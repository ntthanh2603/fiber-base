import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateRelationshipDto {
  @IsNotEmpty({ message: 'ID user 2 not null' })
  @IsString()
  @IsUUID()
  user_id2: string;
}
