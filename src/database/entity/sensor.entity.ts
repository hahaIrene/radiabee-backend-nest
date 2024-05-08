import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { Point } from 'geojson';

@Entity({ name: 'sensor' })
export class Sensor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Index({ spatial: true })
  @Column({
    type: 'geography',
    spatialFeatureType: 'Point',
    srid: 4326,
    nullable: true,
  })
  coordinate: Point;
}
