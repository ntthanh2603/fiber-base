import { LocalAuthGuard } from './../auth/local-auth.guard';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CommentsService } from 'src/comments/comments.service';
import { GroupUsersService } from 'src/groupusers/groupusers.service';
import { RelationshipType, RoleType, ScopeType } from 'src/helper/helper.enum';
import { PostsService } from 'src/posts/posts.service';
import { RelationshipsService } from 'src/relationships/relationships.service';

@Injectable()
export class PostReactionProtecedGuard implements CanActivate {
  constructor(
    private relationshipsService: RelationshipsService,
    private postsService: PostsService,
    private groupusersService: GroupUsersService,
    private commentsService: CommentsService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const body = request.body;

    console.log('>> user', user);
    console.log('>> body', body);

    switch (body.role) {
      case RoleType.POST:
        const findpost = await this.postsService.findPostById(body.target_id);
        switch (findpost.scope) {
          case ScopeType.PUBLIC:
            return true;

          case ScopeType.PRIVATE:
            if (
              findpost.role == RoleType.USER &&
              user.user_id == findpost.createdBy
            )
              return true;

          case ScopeType.PROTECTED:
            if (findpost.role == RoleType.USER) {
              const relationship1 =
                await this.relationshipsService.findRelationship(
                  user.user_id,
                  findpost.createdBy,
                );
              const relationship2 =
                await this.relationshipsService.findRelationship(
                  findpost.createdBy,
                  user.user_id,
                );

              if (!relationship1 || !relationship2)
                throw new NotFoundException();

              if (
                relationship1.relationship == RelationshipType.FRIEND ||
                relationship2.relationship == RelationshipType.FRIEND
              ) {
                return true;
              }
            }
            if (findpost.role == RoleType.GROUP) {
              const groupuser = await this.groupusersService.findUserInGroup(
                body.user_id,
                findpost.target_id,
              );
              if (
                groupuser.role == RoleType.ADMIN ||
                groupuser.role == RoleType.USER
              ) {
                return true;
              }
            }
        }

      case RoleType.COMMENT:
        const comment = await this.commentsService.findCommentById(
          body.target_id,
        );
        const post = await this.postsService.findPostById(comment.post_id);
    }

    return false;
  }
}
