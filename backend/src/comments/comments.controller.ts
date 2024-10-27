import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { IUser } from 'src/users/users.interface';
import { User } from 'src/decorator/customize';
import { ApiTags } from '@nestjs/swagger';
import { DeleteCommentDto } from './dto/delete-comment.dto';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@User() user: IUser, @Body() createDto: CreateCommentDto) {
    return this.commentsService.create(user, createDto);
  }

  @Patch()
  update(@User() user: IUser, @Body() updateDto: UpdateCommentDto) {
    return this.commentsService.update(user, updateDto);
  }

  @Delete()
  remore(@User() user: IUser, @Body() deleteDto: DeleteCommentDto) {
    return this.commentsService.remote(user, deleteDto);
  }
}
