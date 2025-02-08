import { Injectable } from '@nestjs/common';
import { CreateRelationShipDto } from './dto/create-relation-ship.dto';
import { UpdateRelationShipDto } from './dto/update-relation-ship.dto';

@Injectable()
export class RelationShipsService {
  create(createRelationShipDto: CreateRelationShipDto) {
    return 'This action adds a new relationShip';
  }

  findAll() {
    return `This action returns all relationShips`;
  }

  findOne(id: number) {
    return `This action returns a #${id} relationShip`;
  }

  update(id: number, updateRelationShipDto: UpdateRelationShipDto) {
    return `This action updates a #${id} relationShip`;
  }

  remove(id: number) {
    return `This action removes a #${id} relationShip`;
  }
}
