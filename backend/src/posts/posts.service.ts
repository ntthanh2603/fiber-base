import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { IUser } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';
import { urlToHttpOptions } from 'url';
import { RoleType } from 'src/helper/helper.enum';
import { DeletePostDto } from './dto/delete-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async findOne(target_id: string, role: RoleType) {
    const post = await this.postsRepository.findOne({
      where: {
        target_id,
        role,
      },
    });
    if (post) return post;
    throw new BadRequestException();
  }

  async create(
    user: IUser,
    createDto: CreatePostDto,
    file: Express.Multer.File,
  ) {
    if (file) {
      return await this.postsRepository.save({
        target_id: user.user_id,
        content: createDto.content,
        role: createDto.role,
        media: `images/${file.fieldname}/${file.filename}`,
        createdAt: new Date(),
        createdBy: user.user_id,
      });
    } else {
      return await this.postsRepository.save({
        target_id: user.user_id,
        content: createDto.content,
        role: createDto.role,
        media: null,
        createdAt: new Date(),
        createdBy: user.user_id,
      });
    }
  }

  async update(
    user: IUser,
    updateDto: UpdatePostDto,
    file: Express.Multer.File,
  ) {
    const post = await this.findOne(updateDto.target_id, updateDto.role);

    if (post.target_id == user.user_id)
      return await this.postsRepository.update(
        {
          target_id: updateDto.target_id,
          role: updateDto.role,
        },
        {
          ...updateDto,
          media: `images/${file.fieldname}/${file.filename}`,
        },
      );

    throw new BadRequestException();
  }

  async remote(user: IUser, deleteDto: DeletePostDto) {
    const post = await this.findOne(deleteDto.target_id, deleteDto.role);
    if (user.user_id == post.target_id) {
      return this.postsRepository.delete(post);
    }
    throw new ForbiddenException();
  }
}
