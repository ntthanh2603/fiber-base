import { Injectable } from '@nestjs/common';
import { RedisService } from './redis/redis.service';

@Injectable()
export class AppService {
  constructor(private readonly redisService: RedisService) {}

  async home() {
    await this.redisService.set('11dadasfsdfsf', '123');
    await this.redisService.set('11dadasdsfsdsdaads', '123');
    await this.redisService.set('11dadafsdfsdsdaads', '123');
    await this.redisService.set('1sdf1dadasdsdaads', '123');
    await this.redisService.set('1sfs1dadasdsdaads', '123');
    return await this.redisService.getAllKeys(`*`);
  }
}
