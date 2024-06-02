import { Controller, Get, Param, Query } from '@nestjs/common';
import { SensorService } from './sensor.service';

@Controller('sensor')
export class SensorController {
  constructor(private readonly sensorService: SensorService) {}

  @Get()
  async findAll() {
    return await this.sensorService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Query() param: { startTime: string; endTime: string },
  ) {
    return await this.sensorService.findOne(id, param.startTime, param.endTime);
  }

  @Get('info/:id')
  async findOneInfo(@Param('id') id: string) {
    return await this.sensorService.findOneInfo(id);
  }

  @Get('aaa/:uri')
  async getLatestHistories() {
    return await this.sensorService.getLatestHistories();
  }
}
