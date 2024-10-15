import { User } from './../users/entities/user.entity';
import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { CreateRelationshipDto } from './dto/create-relationship.dto';
import { UpdateRelationshipDto } from './dto/update-relationship.dto';
import { Relationship } from './entities/relationship.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RelationshipsService {
  constructor(
    @InjectRepository(Relationship)
    private relationshipsRepository: Repository<Relationship>,
    private usersService: UsersService,
  ) {}

  // Relationship two user
  async relationshipUser(createRelationshipDto: CreateRelationshipDto) {
    const { user1_id, user2_id, relationship } = createRelationshipDto;

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
    else {
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
    }
  }
}
