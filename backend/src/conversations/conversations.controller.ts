import { ConversationsService } from 'src/conversations/conversations.service';
import { Controller, Post, Body, Patch, Delete } from '@nestjs/common';
import { IUser } from 'src/users/users.interface';
import { User } from 'src/decorator/customize';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateConversationDto } from './dto/create-conversation.dto';
import { DeleteConversationDto } from './dto/delete-conversation.dto';
import { UpdateConversationDto } from './dto/update-conversation.dto';

@ApiTags('Conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @ApiBody({ type: CreateConversationDto })
  async creare(@User() user: IUser, @Body() dto: CreateConversationDto) {
    return await this.conversationsService.create(user, dto);
  }

  @Delete()
  async remote(@User() user: IUser, @Body() dto: DeleteConversationDto) {
    return await this.conversationsService.remote(user, dto);
  }

  @Patch()
  async update(@User() user: IUser, @Body() updateDto: UpdateConversationDto) {
    return await this.conversationsService.update(user, updateDto);
  }
}
