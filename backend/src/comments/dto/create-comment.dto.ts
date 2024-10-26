import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  post_is: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
