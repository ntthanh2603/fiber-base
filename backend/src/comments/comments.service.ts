import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from 'src/users/users.interface';
import { PostsService } from 'src/posts/posts.service';
import { RoleType } from 'src/helper/helper.enum';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepository: Repository<Comment>,
    private postsService: PostsService,
  ) {}

  async create(user: IUser, createDto: CreateCommentDto) {
    const post = await this.postsService.findPostById(createDto.post_is);

    if (post) {
      return await this.commentsRepository.save({
        user_id: user.user_id,
        post_id: createDto.post_is,
        content: createDto.content,
      });
    }
    throw new BadRequestException();
  }
}
