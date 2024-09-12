import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Config } from './config.entity';

@Entity()
export class Type {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @OneToMany(() => Config, (config) => config.type)
  configs: Array<Config>;
}
