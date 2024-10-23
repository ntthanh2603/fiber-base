import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HagtagsService } from './hagtags.service';
import { CreateHagtagDto } from './dto/create-hagtag.dto';
import { UpdateHagtagDto } from './dto/update-hagtag.dto';

@Controller('hagtags')
export class HagtagsController {
  constructor(private readonly hagtagsService: HagtagsService) {}
}
