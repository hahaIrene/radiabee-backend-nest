/* eslint-disable */
import { Factory, Seeder } from 'typeorm-seeding';
import fs from 'fs';
import { Connection } from 'typeorm';
import { History } from '../entity/history.entity';
import { Sensor } from '../entity/sensor.entity';
import path from 'path';

export default class CreateHistory implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const repo = connection.getRepository(History);
    const sensorRepo = connection.getRepository(Sensor);
    const [_, count] = await repo.findAndCount();
    if (count !== 0) {
      console.log(`Already has data`);
      return;
    }

    const insertData = async (year: string) => {
      const directoryPath = path.join(__dirname, `../data/${year}`);

      const files = fs.readdirSync(directoryPath);

      const sensorNameMap2Id: { [key: string]: string } = {};
      for (const file of files) {
        if (file.endsWith('.json')) {
          const name = file.replace('.json', '');
          const sensor = await sensorRepo.findOne({ name });
          if (!sensor) continue;
          sensorNameMap2Id[name] = sensor.id;
        }
      }

      console.log(sensorNameMap2Id);

      for (const file of files) {
        const HistoryEntities: History[] = [];
        if (file.endsWith('.json')) {
          const filePath = path.join(directoryPath, file);
          const data = require(filePath);
          console.log(sensorNameMap2Id[file.replace('.json', '')]);

          if (!sensorNameMap2Id[file.replace('.json', '')]) continue;
          for (let i = 0; i < data.length; i++) {
            const c = data[i];

            const historyEntity = new History();
            historyEntity.sensorId =
              sensorNameMap2Id[file.replace('.json', '')];
            historyEntity.createdAt = c.date;
            historyEntity.value = c.value;
            HistoryEntities.push(historyEntity);
          }
          await repo.insert(HistoryEntities);
          console.log(
            `Insert ${year} - ${file} - ${HistoryEntities.length} done`,
          );
        }
      }
    };

    await insertData('2021');
    await insertData('2022');
    await insertData('2023');
    await insertData('2024');
  }
}
