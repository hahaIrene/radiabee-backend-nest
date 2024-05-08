import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import commandLineArgs from 'command-line-args';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { CacheModule } from './cache/cache.module';
import { SensorModule } from './sensor/sensor.module';

const options = commandLineArgs([
  {
    name: 'env',
    alias: 'e',
    defaultValue: 'development',
    type: String,
  },
]);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, `../.config/.env.${options.env}`),
    }),
    DatabaseModule,
    CacheModule,
    SensorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
