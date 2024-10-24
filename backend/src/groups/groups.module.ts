import { forwardRef, Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { DatabaseModule } from 'src/database/database.module';
import { GroupUsersModule } from 'src/groupusers/groupusers.module';
import { FunctionHelper } from 'src/helper/helper.function';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
    DatabaseModule,
    forwardRef(() => GroupUsersModule),
  ],
  controllers: [GroupsController],
  providers: [GroupsService, FunctionHelper],
  exports: [GroupsService],
})
export class GroupsModule {}
