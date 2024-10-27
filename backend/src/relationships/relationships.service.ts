import { User } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';
import { Relationship } from './entities/relationship.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUser } from 'src/users/users.interface';

@Injectable()
export class RelationshipsService {
  constructor(
    @InjectRepository(Relationship)
    private relationshipsRepository: Repository<Relationship>,
    private usersService: UsersService,
  ) {}

  // Relationship two user
  async update(updateRelationshipDto: UpdateRelationshipDto, user: IUser) {
    const { user1_id, user2_id, relationship } = updateRelationshipDto;

    if (user1_id != user.user_id && user2_id != user.user_id) {
      throw new ForbiddenException();
    }
    const user1 = await this.usersService.findUserById(user1_id);
    const user2 = await this.usersService.findUserById(user2_id);

    const existingRelationship = await this.relationshipsRepository.findOne({
      where: {
        user1_id,
        user2_id,
      },
    });

    // Update relationship
    if (existingRelationship && user1 && user2) {
      existingRelationship.relationship = relationship;
      await this.relationshipsRepository.save(existingRelationship);
      return {
        result: {
          message: 'Update relationship 2 user',
          user1: {
            user_id: user1['user_id'],
            username: user1['email'],
          },
          user2: {
            user_id: user2['user_id'],
            username: user2['email'],
          },
          relationshipUpdate: relationship,
        },
      };
    }
    // Create relationship
    else if (!existingRelationship) {
      const newRelationship = new CreateRelationshipDto();
      newRelationship.user1_id = user1_id;
      newRelationship.user2_id = user2_id;
      newRelationship.relationship = relationship;
      await this.relationshipsRepository.save(newRelationship);
      return {
        result: {
          message: 'New relationship created successfully',
          user1: {
            user_id: user1['user_id'],
            username: user1['email'],
          },
          user2: {
            user_id: user2['user_id'],
            username: user2['email'],
          },
          relationshipUpdate: relationship,
        },
      };
    } else throw new NotFoundException('Not found user');
  }

  async findRelationship(user1_id: string, user2_id: string) {
    return await this.relationshipsRepository.findOne({
      where: {
        user1_id,
        user2_id,
      },
    });
  }
}
