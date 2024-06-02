import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { Sensor } from 'src/database/entity/sensor.entity';
import { History } from 'src/database/entity/history.entity';

@Injectable()
export class SensorService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    const repo = this.databaseService.connection.getRepository(Sensor);
    const sensors = await repo.find();
    return sensors;
  }

  async findOne(id: string, startTime: string, endTime: string) {
    const repo = this.databaseService.connection.getRepository(History);

    console.log(id);
    console.log(startTime);
    console.log(endTime);
    const historys = await repo
      .createQueryBuilder('history')
      .where('history.sensorId = :id', { id })
      .andWhere('history.createdAt >= :startTime', { startTime })
      .andWhere('history.createdAt <= :endTime', { endTime })
      .getMany();
    return historys;
  }

  async findOneInfo(id: string) {
    const repo = this.databaseService.connection.getRepository(Sensor);
    const sensor = await repo.findOne({ where: { id } });
    return sensor;
  }

  async getLatestHistories() {
    const historyRepo = this.databaseService.connection.getRepository(History);
    const sensorRepo = this.databaseService.connection.getRepository(Sensor);
    const sensors = await sensorRepo.find();
    const latestHistories = [];

    for (const sensor of sensors) {
      const latestHistory = await historyRepo
        .createQueryBuilder('history')
        .where('history.sensorId = :sensorId', { sensorId: sensor.id })
        .orderBy('history.createdAt', 'DESC')
        .getOne();

      latestHistories.push({
        sensorId: sensor.id,
        sensorName: sensor.name,
        coordinate: sensor.coordinate,
        historyId: latestHistory.id,
        createdAt: latestHistory.createdAt,
        value: latestHistory.value,
      });
    }
    return latestHistories;
  }
}
