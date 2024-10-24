import { IsNotEmpty, IsString } from 'class-validator';

export class AddAdminGroupDto {
  @IsString()
  @IsNotEmpty()
  group_id: string;

  @IsNotEmpty()
  @IsString()
  user_id: string;
}
