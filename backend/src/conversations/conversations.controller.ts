import { Message } from './../messgages/entities/messgage.entity';
import { ConversationsService } from 'src/conversations/conversations.service';
import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { IUser } from 'src/users/users.interface';
import { ResponseMessage, User } from 'src/decorator/customize';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateConversationDto } from './dto/create-conversation.dto';

import { UpdateConversationDto } from './dto/update-conversation.dto';
import { DeleteConversationDto } from './dto/delete-conversation.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { MemberConversationGuard } from 'src/guard/guard-conversation-member';

@ApiTags('Conversations')
@Controller('conversations')
export class ConversationsController {
  constructor(private readonly conversationsService: ConversationsService) {}

  @Post()
  @ApiBody({ type: CreateConversationDto })
  creare(@User() user: IUser, @Body() dto: CreateConversationDto) {
    return this.conversationsService.create(user, dto);
  }

  @Delete()
  remote(@User() user: IUser, @Body() dto: DeleteConversationDto) {
    return this.conversationsService.remote(user, dto);
  }

  @Patch()
  @ResponseMessage('Update conversation')
  @UseGuards(MemberConversationGuard)
  @UseInterceptors(FileInterceptor('avatar-conversation'))
  update(
    @User() user: IUser,
    @Body() updateDto: UpdateConversationDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({
          maxSize: 1000 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.conversationsService.update(user, updateDto, file);
  }
}
