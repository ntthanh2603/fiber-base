import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { GroupUsersService } from './groupusers.service';

@ApiTags('Groupusers')
@Controller('groupusers')
export class GroupUsersController {
  constructor(private readonly groupusersService: GroupUsersService) {}
}
