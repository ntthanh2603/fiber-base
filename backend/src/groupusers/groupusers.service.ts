import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupUser } from './entities/groupuser.entity';
import { GroupsService } from 'src/groups/groups.service';
import { CreateGroupUserDto } from './dto/create-groupuser.dto';

@Injectable()
export class GroupUsersService {
  constructor(
    @InjectRepository(GroupUser)
    private groupusersRepository: Repository<GroupUser>,

    @Inject(forwardRef(() => GroupsService))
    private groupsService: GroupsService,
  ) {}

  async findUserInGroup(user_id: string, group_id: string) {
    return await this.groupusersRepository.findOne({
      where: { user_id: user_id, group_id: group_id },
    });
  }

  async create(groupuserDto: CreateGroupUserDto) {
    return await this.groupusersRepository.save({
      ...groupuserDto,
    });
  }
}
