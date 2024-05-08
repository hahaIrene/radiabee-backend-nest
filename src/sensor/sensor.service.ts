import { Injectable } from '@nestjs/common';
import { CreateSensorDto } from './dto/create-sensor.dto';
import { UpdateSensorDto } from './dto/update-sensor.dto';
import { DatabaseService } from 'src/database/database.service';
import { Sensor } from 'src/database/entity/sensor.entity';
import { History } from 'src/database/entity/history.entity';

@Injectable()
export class SensorService {
  constructor(private readonly databaseService: DatabaseService) {}
  create(createSensorDto: CreateSensorDto) {
    return 'This action adds a new sensor';
  }

  async findAll() {
    const repo = this.databaseService.connection.getRepository(Sensor);
    const sensors = await repo.find();
    return sensors;
  }

  async findOne(id: string, startTime: string, endTime: string) {
    const repo = this.databaseService.connection.getRepository(History);
    const historys = await repo
      .createQueryBuilder('history')
      .where('history.sensorId = :id', { id })
      .andWhere('history.createdAt <= :startTime', { startTime })
      .andWhere('history.createdAt >= :endTime', { endTime })
      .getMany();
    return historys;
  }

  update(id: number, updateSensorDto: UpdateSensorDto) {
    return `This action updates a #${id} sensor`;
  }

  remove(id: number) {
    return `This action removes a #${id} sensor`;
  }
}
