import { IsNotEmpty, IsSemVer, IsString } from 'class-validator';

export class DeleteCommentDto {
  @IsString()
  @IsNotEmpty()
  comment_id: string;
}
