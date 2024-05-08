import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'history' })
export class History {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  sensorId: string;

  @Column({ type: 'timestamptz' })
  createdAt: Date;

  @Column({ type: 'double precision' })
  value: number;
}
