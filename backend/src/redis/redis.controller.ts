import { Controller, Inject, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RedisService } from './redis.service';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@ApiTags('cache')
@Controller('cache')
export class RedisController {
  constructor(
    private readonly redisService: RedisService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // @Get('/get/:key')
  // async getValue(@Param('key') key: string) {
  //   const value = await this.cacheManager.get(key);
  //   if (!value) {
  //     throw new Error('Key not found');
  //   }
  //   return value;
  // }

  @Post('set')
  async setValue() {
    await this.redisService.set('aa', 'aaaa');
    return await this.redisService.get('tuanthanh');
  }
}
