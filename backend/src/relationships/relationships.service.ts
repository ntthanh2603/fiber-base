import { ReactionPostType } from './../helper/helper.enum';
import { User } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';
import { Relationship } from './entities/relationship.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from 'src/users/users.interface';
import { FunctionHelper } from 'src/helper/helper.function';
import { RelationshipType } from 'src/helper/helper.enum';
import { CreateRelationshipDto } from './dto/create-relationship.dto';

@Injectable()
export class RelationshipsService {
  constructor(
    @InjectRepository(Relationship)
    private relationshipsRepository: Repository<Relationship>,
    private usersService: UsersService,
    private functionHelper: FunctionHelper,
  ) {}

  async findRelationship(user_id1: string, user_id2: string) {
    if (
      !this.functionHelper.isValidUUID(user_id1) &&
      !this.functionHelper.isValidUUID(user_id2)
    ) {
      throw new BadRequestException('Invalid group ID format');
    }
    return await this.relationshipsRepository.findOne({
      where: {
        user_id1,
        user_id2,
      },
    });
  }

  // async checkRelationship(user_id1: string, user_id2: string) {
  //   const relationship1 = await this.findRelationship(user_id1, user_id2);
  //   const relationship2 = await this.findRelationship(user_id1, user_id2);

  //   if (relationship1 && relationship2) {
  //     return RelationshipType.FRIEND;
  //   }
  //   if (!relationship1 && relationship2) {
  //     return
  //   }
  // }

  async follow(dto: CreateRelationshipDto, user: IUser) {
    const { user_id2 } = dto;
    const user_id1 = user.user_id;

    const user2 = await this.usersService.findUserById(user_id2);

    if (!user2) throw new NotFoundException();

    const relationship_user1_user2 = await this.findRelationship(
      user_id1,
      user_id2,
    );

    const relationship_user2_user1 = await this.findRelationship(
      user_id2,
      user_id1,
    );

    if (!relationship_user1_user2) {
      if (!relationship_user2_user1) {
        await this.relationshipsRepository.save({
          user_id1,
          user_id2,
          relationship: RelationshipType.FOLLOW,
        });
        return {
          user_id1,
          user_id2,
          relationship: RelationshipType.FOLLOW,
        };
      } else {
        await this.relationshipsRepository.save({
          user_id1: user_id1,
          user_id2: user_id2,
          relationship: RelationshipType.FRIEND,
        });

        await this.relationshipsRepository.update(
          {
            user_id1: user_id2,
            user_id2: user_id1,
          },
          {
            relationship: RelationshipType.FRIEND,
          },
        );

        return {
          user_id1: user_id1,
          user_id2: user_id2,
          relationship: RelationshipType.FRIEND,
        };
      }
    }
    throw new BadRequestException(
      `${user_id1} followed ${user_id2} or ${user_id1} and ${user_id2} is friend`,
    );
  }

  async unFollow(dto: CreateRelationshipDto, user: IUser) {
    const { user_id2 } = dto;
    const user_id1 = user.user_id;

    const user2 = await this.usersService.findUserById(user_id2);

    if (!user2) throw new NotFoundException();

    const relationship_user1_user2 = await this.findRelationship(
      user_id1,
      user_id2,
    );

    const relationship_user2_user1 = await this.findRelationship(
      user_id2,
      user_id1,
    );

    if (!relationship_user1_user2) {
      throw new BadRequestException(
        `${user_id1} and ${user_id2} not friend or follower`,
      );
    } else if (
      relationship_user1_user2.relationship == RelationshipType.FRIEND
    ) {
      await this.relationshipsRepository.delete({
        user_id1: user_id1,
        user_id2: user_id2,
      });
      await this.relationshipsRepository.update(
        {
          user_id1: user_id2,
          user_id2: user_id1,
        },
        {
          relationship: RelationshipType.FOLLOW,
        },
      );
      return {
        message: `${user_id1} unfollow ${user_id2} and ${user_id2} follow ${user_id1}`,
      };
    } else if (
      relationship_user1_user2.relationship == RelationshipType.FOLLOW
    ) {
      await this.relationshipsRepository.delete(relationship_user1_user2);
      return {
        message: `${user_id1} unfollowed ${user_id2}`,
      };
    }
  }
}
