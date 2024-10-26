import { IsNotEmpty, IsSemVer, IsString } from 'class-validator';

export class DeleteGroupUserDto {
  @IsNotEmpty()
  @IsString()
  group_id: string;
}
