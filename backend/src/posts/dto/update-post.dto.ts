import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleType } from 'src/helper/helper.enum';

export class UpdatePostDto {
  @IsString()
  @IsNotEmpty()
  target_id: string;

  @IsString()
  @IsOptional()
  content: string;

  @IsString()
  @IsNotEmpty()
  role: RoleType;
}
