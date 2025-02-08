import { Module } from '@nestjs/common';
import { RelationShipsService } from './relation-ships.service';
import { RelationShipsController } from './relation-ships.controller';

@Module({
  controllers: [RelationShipsController],
  providers: [RelationShipsService],
})
export class RelationShipsModule {}
