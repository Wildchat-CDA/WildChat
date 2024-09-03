import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Section } from './section.entity';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  uuid: string;

  @Column({ length: 150 })
  title: string;

  @Column()
  type: number;

  @Column()
  slot: number;

  @ManyToMany(() => Section, (section: Section) => section.channels)
  sections: Array<Section>;
}
