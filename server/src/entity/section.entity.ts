import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Channel } from './channel.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column()
  order: number;

  @ManyToMany(() => Channel)
  @JoinTable()
  channels: Array<Channel>;
}
