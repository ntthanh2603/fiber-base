import { Get, Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}
  @Get()
  async home() {
    await this.redisService.set('key', 'value', 3600);
    const value = await this.redisService.get('key');
    return { data: `${value}` };
  }
}
