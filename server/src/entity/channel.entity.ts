import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Section } from './section.entity';
import { Config } from './config.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  uuid: string;

  @Column({ length: 150 })
  title: string;

  @Column()
  slot: number;

  @OneToOne(() => Config)
  @JoinColumn()
  config: Config;

  @ManyToMany(() => Section, (section: Section) => section.channels)
  sections: Array<Section>;
}
