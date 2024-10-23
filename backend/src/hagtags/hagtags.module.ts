import { Module } from '@nestjs/common';
import { HagtagsService } from './hagtags.service';
import { HagtagsController } from './hagtags.controller';

@Module({
  controllers: [HagtagsController],
  providers: [HagtagsService],
})
export class HagtagsModule {}
