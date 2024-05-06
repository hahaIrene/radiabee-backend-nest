import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Connection, createConnection } from 'typeorm';

@Injectable()
export class DatabaseService {
  public connection: Connection;
  private readonly logger = new Logger();

  constructor(private readonly configService: ConfigService) {
    this.connect();
  }

  private connect = async () => {
    try {
      this.connection = await createConnection();
      this.logger.log(
        `Database server connected | ${this.configService.get(
          'postgres_host',
        )}:${this.configService.get(
          'postgres_port',
        )} | ${this.configService.get('postgres_database')}`,
      );
    } catch (err) {
      this.logger.fatal(
        `Database server connect failed | ${this.configService.get(
          'postgres_host',
        )}:${this.configService.get(
          'postgres_port',
        )} | ${this.configService.get('postgres_database')}`,
      );
      this.logger.fatal(err);
    }
  };
}
