import { forwardRef, Module } from '@nestjs/common';
import { GroupUsersService } from './groupusers.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { GroupUser } from './entities/groupuser.entity';
import { GroupsModule } from 'src/groups/groups.module';
import { GroupUsersController } from './groupusers.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroupUser]),
    DatabaseModule,
    forwardRef(() => GroupsModule),
  ],
  controllers: [GroupUsersController],
  providers: [GroupUsersService],
  exports: [GroupUsersService],
})
export class GroupUsersModule {}
