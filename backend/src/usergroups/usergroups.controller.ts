import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsergroupsService } from './usergroups.service';
import { CreateUsergroupDto } from './dto/create-usergroup.dto';
import { UpdateUsergroupDto } from './dto/update-usergroup.dto';

@Controller('usergroups')
export class UsergroupsController {
  constructor(private readonly usergroupsService: UsergroupsService) {}
}
