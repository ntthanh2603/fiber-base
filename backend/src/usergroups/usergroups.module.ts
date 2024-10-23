import { Module } from '@nestjs/common';
import { UsergroupsService } from './usergroups.service';
import { UsergroupsController } from './usergroups.controller';

@Module({
  controllers: [UsergroupsController],
  providers: [UsergroupsService],
})
export class UsergroupsModule {}
