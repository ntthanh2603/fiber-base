import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { CreateReactionDto } from './dto/create-reaction.dto';

import { ApiAcceptedResponse, ApiBody, ApiTags } from '@nestjs/swagger';
import { IUser } from 'src/users/users.interface';
import { User } from 'src/decorator/customize';
import { PostGuard } from 'src/guard/guard-post';

@ApiTags('Reactions')
@Controller('reactions')
export class ReactionsController {
  constructor(private readonly reactionsService: ReactionsService) {}

  @UseGuards(PostGuard)
  @Post()
  @ApiBody({ type: CreateReactionDto })
  create(@User() user: IUser, @Body() dto: CreateReactionDto) {
    return this.reactionsService.create(user, dto);
  }
}
