import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RoleType } from 'src/helper/helper.enum';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  target_id: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  role: RoleType;

  @IsString()
  @IsNotEmpty()
  scope: string;
}
