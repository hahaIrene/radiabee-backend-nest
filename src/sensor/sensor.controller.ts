import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SensorService } from './sensor.service';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';

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
    console.log(param.startTime, param.endTime);
    return await this.sensorService.findOne(id, param.startTime, param.endTime);
  }
}
