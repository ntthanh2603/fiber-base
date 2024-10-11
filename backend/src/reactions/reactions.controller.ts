import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { UpdateReactionDto } from './dto/update-reaction.dto';

@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @Post()
  create(@Body() createReactionDto: CreateReactionDto) {
    return this.reactionsService.create(createReactionDto);
  }

  @Get()
  findAll() {
    return this.reactionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reactionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReactionDto: UpdateReactionDto) {
    return this.reactionsService.update(+id, updateReactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reactionsService.remove(+id);
  }
}
