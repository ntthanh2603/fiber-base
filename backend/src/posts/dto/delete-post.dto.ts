import { RoleType } from 'src/helper/helper.enum';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeletePostDto {
  @IsString()
  @IsNotEmpty()
  target_id: string;

  @IsString()
  @IsNotEmpty()
  role: RoleType;
}
