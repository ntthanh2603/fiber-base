import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { ReactionType, RoleType } from 'src/helper/helper.enum';

export class CreateReactionDto {
  @IsString()
  @IsNotEmpty()
  target_id: string;

  @IsString()
  @IsNotEmpty()
  role: RoleType;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: ReactionType.LIKE })
  reaction: ReactionType;
}
