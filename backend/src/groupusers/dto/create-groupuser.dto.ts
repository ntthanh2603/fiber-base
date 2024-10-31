import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { GroupUserType, RoleType } from 'src/helper/helper.enum';

export class CreateGroupUserDto {
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  group_id: string;

  @IsNotEmpty()
  @IsEnum(GroupUserType)
  groupuserType: GroupUserType;
}
