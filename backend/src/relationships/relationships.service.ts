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

  async checkRelationship(user_id1: string, user_id2: string) {
    const relationship1 = await this.findRelationship(user_id1, user_id2);
    const relationship2 = await this.findRelationship(user_id1, user_id2);

    if (relationship1 && relationship1) {
    }
  }

  async follow(updateRelationshipDto: UpdateRelationshipDto, user: IUser) {
    const { user_id2 } = updateRelationshipDto;

    const user2 = await this.usersService.findUserById(user_id2);

    if (!user2) throw new NotFoundException();

    const relationship = await this.findRelationship(user.user_id, user_id2);

    if (!relationship) {
      return await this.relationshipsRepository.save({
        user_id1: user.user_id,
        user_id2: user_id2,
      });
    }
    return {
      message: 'Followed',
    };
  }

  async unFollow(updateRelationshipDto: UpdateRelationshipDto, user: IUser) {
    const { user_id2 } = updateRelationshipDto;

    const user2 = await this.usersService.findUserById(user_id2);

    if (!user2) throw new NotFoundException();

    const relationship = await this.findRelationship(user.user_id, user_id2);

    if (relationship) {
      return await this.relationshipsRepository.delete(relationship);
    }
    return {
      message: 'UnFollowed',
    };
  }
}
