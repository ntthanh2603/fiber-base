import { IUser } from './../users/users.interface';
import {
  Injectable,
  ForbiddenException,
  forwardRef,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { GroupUsersService } from 'src/groupusers/groupusers.service';
import { RoleType } from 'src/helper/helper.enum';
import { DeleteGroupDto } from './dto/delete-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,

    @Inject(forwardRef(() => GroupUsersService))
    private groupusersService: GroupUsersService,
  ) {}

  async create(user: IUser, createDto: CreateGroupDto) {
    const group = await this.groupsRepository.save({
      groupname: createDto.groupname,
      description: createDto.description,
      createdAt: new Date(),
      createdBy: user.user_id,
    });

    await this.groupusersService.create({
      user_id: user.user_id,
      group_id: group.group_id,
      role: RoleType.ADMIN,
    });
    return group;
  }

  async update(user: IUser, updateDto: UpdateGroupDto) {
    try {
      const groupuser = await this.groupusersService.findUserInGroup(
        user.user_id,
        updateDto.group_id,
      );
      const group = await this.findOneGroupById(updateDto.group_id);

      if (!group) throw new BadRequestException();

      if (groupuser && groupuser.role == RoleType.ADMIN) {
        return await this.groupsRepository.update(
          { group_id: updateDto.group_id },
          { ...updateDto },
        );
      }
    } catch {
      throw new ForbiddenException();
    }
  }

  async findOneGroupById(group_id: string) {
    return await this.groupsRepository.findOne({
      where: {
        group_id: group_id,
      },
    });
  }

  async remote(user: IUser, deleteDto: DeleteGroupDto) {
    try {
      const groupuser = await this.groupusersService.findUserInGroup(
        user.user_id,
        deleteDto.group_id,
      );
      const group = await this.findOneGroupById(deleteDto.group_id);

      if (!group) throw new BadRequestException();

      if (groupuser && groupuser.role == RoleType.ADMIN) {
        return await this.groupsRepository.delete({
          group_id: deleteDto.group_id,
        });
      }
    } catch {
      throw new ForbiddenException();
    }
  }
}
