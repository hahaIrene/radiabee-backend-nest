/* eslint-disable */
import { Factory, Seeder } from 'typeorm-seeding';
import data from '../data/station.json';
import { Connection } from 'typeorm';
import { Sensor } from '../entity/sensor.entity';

export default class CreateTest implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const repo = connection.getRepository(Sensor);
    const [_, count] = await repo.findAndCount();
    if (count !== 0) {
      console.log(`Already has data`);
      return;
    }

    const SensorEntities: Sensor[] = [];
    for (let i = 0; i < data.length; i++) {
      const c = data[i];
      const sensorEntity = new Sensor();
      sensorEntity.coordinate = {
        type: 'Point',
        coordinates: [c.lon, c.lat],
      };
      sensorEntity.name = c.station;
      SensorEntities.push(sensorEntity);
    }
    await repo.insert(SensorEntities);
  }
}
