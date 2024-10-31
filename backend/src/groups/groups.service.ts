import { IUser } from './../users/users.interface';
import {
  Injectable,
  ForbiddenException,
  forwardRef,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Repository } from 'typeorm';
import { GroupUsersService } from 'src/groupusers/groupusers.service';
import { GroupUserType, RoleType } from 'src/helper/helper.enum';
import { DeleteGroupDto } from './dto/delete-group.dto';
import { FunctionHelper } from 'src/helper/helper.function';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private groupsRepository: Repository<Group>,

    @Inject(forwardRef(() => GroupUsersService))
    private groupusersService: GroupUsersService,

    private functionHelper: FunctionHelper,
  ) {}

  async create(user: IUser, createDto: CreateGroupDto) {
    const group = await this.groupsRepository.save({
      groupname: createDto.groupname,
      description: createDto.description,
      createdAt: new Date(),
      createdBy: user.user_id,
      privacy: createDto.privacy,
    });

    await this.groupusersService.create({
      user_id: user.user_id,
      group_id: group.group_id,
      groupuserType: GroupUserType.ADMIN,
    });
    return group;
  }

  async update(user: IUser, updateDto: UpdateGroupDto) {
    const groupuser = await this.groupusersService.findUserInGroup(
      user.user_id,
      updateDto.group_id,
    );

    const group = await this.findOneGroupById(updateDto.group_id);

    if (!group) throw new BadRequestException();

    if (groupuser && groupuser.groupuserType == GroupUserType.ADMIN) {
      return await this.groupsRepository.update(
        { group_id: updateDto.group_id },
        { ...updateDto, updatedAt: new Date(), updatedBy: user.user_id },
      );
    }
  }

  async findOneGroupById(group_id: string) {
    if (!this.functionHelper.isValidUUID(group_id)) {
      throw new BadRequestException('Invalid group ID format');
    }
    const group = await this.groupsRepository.findOne({
      where: {
        group_id,
      },
    });
    if (group) return group;

    throw new NotFoundException();
  }

  async remote(user: IUser, deleteDto: DeleteGroupDto) {
    const groupuser = await this.groupusersService.findUserInGroup(
      user.user_id,
      deleteDto.group_id,
    );
    const group = await this.findOneGroupById(deleteDto.group_id);

    if (!group) throw new BadRequestException();

    await this.groupusersService.deleteAllUser(deleteDto.group_id);

    if (groupuser && groupuser.groupuserType == GroupUserType.ADMIN) {
      return await this.groupsRepository.delete({
        group_id: deleteDto.group_id,
      });
    }
  }
}
