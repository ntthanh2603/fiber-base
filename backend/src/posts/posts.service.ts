import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { IUser } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async create(
    user: IUser,
    createDto: CreatePostDto,
    file: Express.Multer.File,
  ) {
    try {
      return await this.postsRepository.save({
        target_id: user.user_id,
        content: createDto.content,
        role: createDto.role,
        media: `images/${file.fieldname}/${file.filename}`,
        createdAt: new Date(),
        createdBy: user.user_id,
      });
    } catch (error) {
      throw error;
    }
  }
}
