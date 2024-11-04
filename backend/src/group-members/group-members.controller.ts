import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupMembersService } from './group-members.service';
import { CreateGroupMemberDto } from './dto/create-group-member.dto';
import { UpdateGroupMemberDto } from './dto/update-group-member.dto';

@Controller('group-members')
export class GroupMembersController {
  constructor(private readonly groupMembersService: GroupMembersService) {}

  @Post()
  create(@Body() createGroupMemberDto: CreateGroupMemberDto) {
    return this.groupMembersService.create(createGroupMemberDto);
  }

  @Get()
  findAll() {
    return this.groupMembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupMembersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupMemberDto: UpdateGroupMemberDto) {
    return this.groupMembersService.update(+id, updateGroupMemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupMembersService.remove(+id);
  }
}
