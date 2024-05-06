import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class CacheService {
  public connection: RedisClientType;
  private readonly logger = new Logger();

  constructor(private readonly configService: ConfigService) {
    this.connect();
  }

  private connect = async () => {
    this.connection = createClient({
      socket: {
        host: this.configService.get('redis_host'),
        port: this.configService.get('redis_port'),
      },
      password: this.configService.get('redis_password'),
    });

    try {
      await this.connection.connect();
      this.logger.log(
        `Cache server connected | ${this.configService.get(
          'redis_host',
        )}:${this.configService.get('redis_port')}`,
      );
    } catch (err) {
      this.logger.fatal(
        `Cache server connect failed | ${this.configService.get(
          'redis_host',
        )}:${this.configService.get('redis_port')}`,
      );
      this.logger.fatal(err);
    }
  };
}
