import { Injectable, Inject, OnModuleInit, Logger } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Redis } from 'ioredis';
import { ConfigService } from '@nestjs/config';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class RedisService implements OnModuleInit {
  private readonly redisClient: Redis;
  private readonly logger = new Logger(RedisService.name);
  private reconnectAttempts = 0;
  private readonly MAX_RECONNECT_ATTEMPTS = 5;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {
    const redisOptions = {
      host: this.configService.get('REDIS_HOST'),
      port: parseInt(this.configService.get('REDIS_PORT')),
      retryStrategy: (times: number) => {
        if (times > this.MAX_RECONNECT_ATTEMPTS) {
          this.logger.error(
            `Failed to connect to Redis after ${times} attempts`,
          );
          return null; // stop retrying
        }
        const delay = Math.min(times * 1000, 3000);
        this.logger.log(`Retrying connection... Attempt ${times}`);
        return delay;
      },
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
      autoReconnect: true,
      reconnectOnError: (err: Error) => {
        this.logger.error(`Redis reconnect error: ${err.message}`);
        return true;
      },
      lazyConnect: true, // Don't connect immediately
    };

    this.redisClient = new Redis(redisOptions);

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.redisClient.on('error', (err) => {
      this.logger.error(`Redis Error: ${err.message}`);
    });

    this.redisClient.on('connect', () => {
      this.logger.log('Connected to Redis');
      this.reconnectAttempts = 0;
    });

    this.redisClient.on('ready', () => {
      this.logger.log('Redis is ready');
    });

    this.redisClient.on('end', () => {
      this.logger.warn('Redis connection ended');
    });

    this.redisClient.on('reconnecting', () => {
      this.reconnectAttempts++;
      this.logger.warn(
        `Reconnecting to Redis... Attempt ${this.reconnectAttempts}`,
      );
    });
  }

  async onModuleInit() {
    try {
      await this.redisClient.connect();
      await this.redisClient.ping();
      this.logger.log('Successfully connected to Redis');
    } catch (error) {
      this.logger.error(
        'Failed to initialize Redis connection:',
        error.message,
      );
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.redisClient.quit();
  }

  async get(key: string): Promise<any> {
    try {
      const result = await this.redisClient.get(key);
      return result ? JSON.parse(result) : null;
    } catch (error) {
      this.logger.error(`Error getting key ${key}:`, error.message);
      throw error;
    }
  }

  async set(key: string, value: any, ttl?: number): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      if (ttl) {
        await this.redisClient.set(key, serializedValue, 'EX', ttl);
      } else {
        await this.redisClient.set(key, serializedValue);
      }
    } catch (error) {
      this.logger.error(`Error setting key ${key}:`, error.message);
      throw error;
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.redisClient.del(key);
    } catch (error) {
      this.logger.error(`Error deleting key ${key}:`, error.message);
      throw error;
    }
  }
}
