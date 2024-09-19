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

  @Column({ default: false })
  isClassRoom: boolean;

  @Column({ unique: true })
  order: number;

  @ManyToMany(() => Channel, (channel: Channel) => channel.sections, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinTable()
  channels: Array<Channel>;
}
