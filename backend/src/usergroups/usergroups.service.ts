import { Injectable } from '@nestjs/common';
import { CreateUsergroupDto } from './dto/create-usergroup.dto';
import { UpdateUsergroupDto } from './dto/update-usergroup.dto';

@Injectable()
export class UsergroupsService {
  create(createUsergroupDto: CreateUsergroupDto) {
    return 'This action adds a new usergroup';
  }

  findAll() {
    return `This action returns all usergroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usergroup`;
  }

  update(id: number, updateUsergroupDto: UpdateUsergroupDto) {
    return `This action updates a #${id} usergroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} usergroup`;
  }
}
