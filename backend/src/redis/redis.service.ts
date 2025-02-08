import { Injectable, Inject } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  constructor(@Inject('REDIS_CLIENT') private readonly redis: Redis) {}

  // Lưu dữ liệu vào cache với TTL (mặc định 1 giờ)
  async setCache(key: string, value: any, ttl = 3600): Promise<void> {
    await this.redis.set(key, JSON.stringify(value), 'EX', ttl);
  }

  // Lấy dữ liệu từ cache
  async getCache<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? JSON.parse(data) : null;
  }

  // Xóa cache theo key
  async delCache(key: string): Promise<void> {
    await this.redis.del(key);
  }

  // Xóa tất cả key theo pattern (cẩn thận khi dùng)
  async clearCache(pattern = '*'): Promise<void> {
    const keys = await this.redis.keys(pattern);
    if (keys.length) {
      await this.redis.del(...keys);
    }
  }

  // Lấy tất cả key (để debug)
  async getAllKeys(pattern = '*'): Promise<string[]> {
    return this.redis.keys(pattern);
  }
}
