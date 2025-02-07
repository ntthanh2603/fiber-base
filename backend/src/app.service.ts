import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  async home() {
    await this.redisService.setCache('11dadasfsdfsf', '123');
    await this.redisService.setCache('11dadasdsfsdsdaads', '123');
    await this.redisService.setCache('11dadafsdfsdsdaads', '123');
    await this.redisService.setCache('1sdf1dadasdsdaads', '123');
    await this.redisService.setCache('1sfs1dadasdsdaads', '123');
    return await this.redisService.getAllKeys(`*`);
  }
}
