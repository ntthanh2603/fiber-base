import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleType } from 'src/helper/helper.enum';

export class AddUserGroupDto {
  @IsString()
  @IsNotEmpty()
  group_id: string;
}
