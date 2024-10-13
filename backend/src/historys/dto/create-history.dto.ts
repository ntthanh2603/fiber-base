import { IsNotEmpty } from 'class-validator';
import { RoleType } from 'src/helper/helper.enum';

export class CreateHistoryDto {
  @IsNotEmpty({ message: 'ID not null' })
  target_id: string;

  @IsNotEmpty({ message: ' CreatedBy not null' })
  createdBy: string;

  @IsNotEmpty({ message: ' CreatedAt not null' })
  createdAt: Date;

  @IsNotEmpty({ message: 'Role not null' })
  role: RoleType;
}
