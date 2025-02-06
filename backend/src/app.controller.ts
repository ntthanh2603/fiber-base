import { Controller, Get, UseInterceptors, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './decorator/customize';
import { CACHE_MANAGER, CacheInterceptor } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @Get()
  @Public()
  @UseInterceptors(CacheInterceptor)
  async home() {
    // await this.cacheManager.set('tuanthanh', 'hello wordl');
    // return this.cacheManager.get('tuanthanh');
  }
}
