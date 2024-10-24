import {
  BadRequestException,
  ForbiddenException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupUser } from './entities/groupuser.entity';
import { GroupsService } from 'src/groups/groups.service';
import { CreateGroupUserDto } from './dto/create-groupuser.dto';
import { IUser } from 'src/users/users.interface';

import { RoleType } from 'src/helper/helper.enum';
import { AddUserGroupDto } from './dto/add-usergroup.dto';
import { AddAdminGroupDto } from './dto/add-admingroup.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GroupUsersService {
  constructor(
    @InjectRepository(GroupUser)
    private groupusersRepository: Repository<GroupUser>,

    @Inject(forwardRef(() => GroupsService))
    private groupsService: GroupsService,

    private usersService: UsersService,
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

  async addUser(user: IUser, addDto: AddUserGroupDto) {
    try {
      const group = await this.groupsService.findOneGroupById(addDto.group_id);
      if (!group) throw new BadRequestException();

      const groupuser = this.groupusersRepository.findOne({
        where: {
          user_id: user.user_id,
          group_id: addDto.group_id,
        },
      });
      if (!groupuser) {
        return this.groupusersRepository.save({
          user_id: user.user_id,
          group_id: addDto.group_id,
          role: RoleType.USER,
        });
      } else throw new BadRequestException();
    } catch (err) {
      throw err;
    }
  }

  async addAdmin(user: IUser, addDto: AddAdminGroupDto) {
    try {
      const group = await this.groupsService.findOneGroupById(addDto.group_id);
      const userOther = this.usersService.findUserById(addDto.user_id);

      if (!group || !userOther) throw new BadRequestException();

      const groupuser = await this.findUserInGroup(
        user.user_id,
        addDto.group_id,
      );

      if (groupuser.role == RoleType.ADMIN) {
        await this.groupusersRepository.delete({
          user_id: addDto.user_id,
          group_id: addDto.group_id,
        });
        return await this.groupusersRepository.save({
          user_id: addDto.user_id,
          group_id: addDto.group_id,
          role: RoleType.ADMIN,
        });
      } else throw new ForbiddenException();
    } catch (err) {
      throw err;
    }
  }
}
