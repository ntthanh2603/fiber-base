import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { IUser } from 'src/users/users.interface';
import { RelationshipType, RoleType, ScopeType } from 'src/helper/helper.enum';
import { Reaction } from './entities/reaction.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentsService } from 'src/comments/comments.service';
import { PostsService } from 'src/posts/posts.service';
import { FunctionHelper } from 'src/helper/helper.function';
import { use } from 'passport';
import { RelationshipsService } from 'src/relationships/relationships.service';
import { GroupUsersService } from 'src/groupusers/groupusers.service';

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(Reaction)
    private reactionsRepository: Repository<Reaction>,
    private functionHelper: FunctionHelper,
    private commentsService: CommentsService,
    private postsService: PostsService,
    private relationshipsService: RelationshipsService,
    private groupusersService: GroupUsersService,
  ) {}

  async findReactionById(reaction_id: string) {
    if (!this.functionHelper.isValidUUID(reaction_id)) {
      throw new BadRequestException('Invalid group ID format');
    }
    return await this.reactionsRepository.findOne({
      where: { reaction_id },
    });
  }

  async findReactionByUser_idTarget_id(
    user_id: string,
    target_id: string,
    role: RoleType,
  ) {
    if (
      !this.functionHelper.isValidUUID(user_id) &&
      !this.functionHelper.isValidUUID(target_id)
    ) {
      throw new BadRequestException('Invalid group ID format');
    }
    return await this.reactionsRepository.findOne({
      where: { user_id, target_id, role },
    });
  }

  async create(user: IUser, dto: CreateReactionDto) {
    const reaction = await this.findReactionByUser_idTarget_id(
      user.user_id,
      dto.target_id,
      dto.role,
    );
    if (dto.role == RoleType.COMMENT) {
      const comment = await this.commentsService.findCommentById(dto.target_id);
      const post = await this.postsService.findPostById(comment.post_id);
      if (post.scope == ScopeType.PUBLIC) {
        return this.reactionsRepository.save({
          user_id: user.user_id,
          targer_id: dto.target_id,
          role: dto.role,
          reaction: dto.reaction,
        });
      }
      if (post.scope == ScopeType.PROTECTED) {
        if (post.role == RoleType.USER) {
          const relationship1 =
            await this.relationshipsService.findRelationship(
              post.target_id,
              user.user_id,
            );
          const relationship2 =
            await this.relationshipsService.findRelationship(
              user.user_id,
              post.target_id,
            );
          if (
            relationship1.relationship == RelationshipType.FRIEND ||
            relationship2.relationship == RelationshipType.FRIEND
          ) {
            return await this.reactionsRepository.save({
              user_id: user.user_id,
              targer_id: dto.target_id,
              role: dto.role,
              reaction: dto.reaction,
            });
          }
        }

        if (post.role == RoleType.GROUP) {
          const groupuser = await this.groupusersService.findUserInGroup(
            user.user_id,
            post.target_id,
          );
          if (
            groupuser.role == RoleType.ADMIN ||
            groupuser.role == RoleType.USER
          ) {
            return await this.reactionsRepository.save({
              user_id: user.user_id,
              targer_id: dto.target_id,
              role: dto.role,
              reaction: dto.reaction,
            });
          }
        }
      }
    }
    if (dto.role == RoleType.POST) {
      const post = await this.postsService.findPostById(dto.target_id);
      if (post.scope == ScopeType.PUBLIC) {
        return this.reactionsRepository.save({
          user_id: user.user_id,
          targer_id: dto.target_id,
          role: dto.role,
          reaction: dto.reaction,
        });
      }
      if (post.scope == ScopeType.PROTECTED) {
        if (post.role == RoleType.USER) {
          const relationship1 =
            await this.relationshipsService.findRelationship(
              post.target_id,
              user.user_id,
            );
          const relationship2 =
            await this.relationshipsService.findRelationship(
              user.user_id,
              post.target_id,
            );
          if (
            relationship1.relationship == RelationshipType.FRIEND ||
            relationship2.relationship == RelationshipType.FRIEND
          ) {
            return await this.reactionsRepository.save({
              user_id: user.user_id,
              targer_id: dto.target_id,
              role: dto.role,
              reaction: dto.reaction,
            });
          }
        }

        if (post.role == RoleType.GROUP) {
          const groupuser = await this.groupusersService.findUserInGroup(
            user.user_id,
            post.target_id,
          );
          if (
            groupuser.role == RoleType.ADMIN ||
            groupuser.role == RoleType.USER
          ) {
            return await this.reactionsRepository.save({
              user_id: user.user_id,
              targer_id: dto.target_id,
              role: dto.role,
              reaction: dto.reaction,
            });
          }
        }
      }

      throw new BadRequestException();
    }
  }
}
