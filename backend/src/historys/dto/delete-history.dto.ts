import { IsNotEmpty } from 'class-validator';
import { RoleType } from 'src/helper/helper.enum';

export class DeleteHistoryDto {
  @IsNotEmpty({ message: 'ID not null' })
  target_id: string;

  @IsNotEmpty({ message: ' CreatedBy not null' })
  deletedBy: string;

  @IsNotEmpty({ message: ' CreatedAt not null' })
  deletedAt: Date;

  @IsNotEmpty({ message: 'Role not null' })
  role: RoleType;
}
