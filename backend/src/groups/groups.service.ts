import { IUser } from './../users/users.interface';
import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,
  ) {}

  async create(user: IUser, createDto: CreateGroupDto) {
    return await this.groupsRepository.save({
      groupname: createDto.groupname,
      description: createDto.description,
      createdAt: new Date(),
      createdBy: user.user_id,
    });
  }
}
