import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Type } from './type.entity';
import { Section } from './section.entity';

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  maxSlot: number;

  @ManyToOne(() => Type, (type) => type.configs)
  type: Type;

  @OneToMany(() => Section, (section) => section.config)
  sections: Array<Section>;
}
