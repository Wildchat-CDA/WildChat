import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Type } from './type.entity';

@Entity()
export class Config {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  maxSlot: number;

  @ManyToOne(() => Type, (type) => type.configs)
  type: Type;
}
