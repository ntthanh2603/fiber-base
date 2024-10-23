import { Injectable } from '@nestjs/common';
import { CreateHagtagDto } from './dto/create-hagtag.dto';
import { UpdateHagtagDto } from './dto/update-hagtag.dto';

@Injectable()
export class HagtagsService {
  create(createHagtagDto: CreateHagtagDto) {
    return 'This action adds a new hagtag';
  }

  findAll() {
    return `This action returns all hagtags`;
  }

  findOne(id: number) {
    return `This action returns a #${id} hagtag`;
  }

  update(id: number, updateHagtagDto: UpdateHagtagDto) {
    return `This action updates a #${id} hagtag`;
  }

  remove(id: number) {
    return `This action removes a #${id} hagtag`;
  }
}
