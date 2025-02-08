import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RelationShipsService } from './relation-ships.service';
import { CreateRelationShipDto } from './dto/create-relation-ship.dto';
import { UpdateRelationShipDto } from './dto/update-relation-ship.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('RelationShips')
@Controller('relation-ships')
export class RelationShipsController {
  constructor(private readonly relationShipsService: RelationShipsService) {}

  @Post()
  create(@Body() createRelationShipDto: CreateRelationShipDto) {
    return this.relationShipsService.create(createRelationShipDto);
  }

  @Get()
  findAll() {
    return this.relationShipsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.relationShipsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRelationShipDto: UpdateRelationShipDto,
  ) {
    return this.relationShipsService.update(+id, updateRelationShipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.relationShipsService.remove(+id);
  }
}
