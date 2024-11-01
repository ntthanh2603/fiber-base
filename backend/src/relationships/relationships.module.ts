import { Module } from '@nestjs/common';
import { RelationshipsService } from './relationships.service';
import { RelationshipsController } from './relationships.controller';
import { DatabaseModule } from 'src/database/database.module';
import { Relationship } from './entities/relationship.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { FunctionHelper } from 'src/helper/helper.function';

@Module({
  imports: [
    TypeOrmModule.forFeature([Relationship]),
    DatabaseModule,
    UsersModule,
  ],
  controllers: [RelationshipsController],
  providers: [RelationshipsService, FunctionHelper],
  exports: [RelationshipsService],
})
export class RelationshipsModule {}
