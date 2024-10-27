import { UsersModule } from './../users/users.module';
import { forwardRef, Module } from '@nestjs/common';
import { GroupUsersService } from './groupusers.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { GroupUser } from './entities/groupuser.entity';
import { GroupsModule } from 'src/groups/groups.module';
import { GroupUsersController } from './groupusers.controller';
import { FunctionHelper } from 'src/helper/helper.function';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupUser]),
    DatabaseModule,
    forwardRef(() => GroupsModule),
    UsersModule,
  ],
  controllers: [GroupUsersController],
  providers: [GroupUsersService, FunctionHelper],
  exports: [GroupUsersService],
})
export class GroupUsersModule {}
