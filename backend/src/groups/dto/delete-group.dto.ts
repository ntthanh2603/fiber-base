import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteGroupDto {
  @IsString()
  @IsNotEmpty()
  group_id: string;
}
