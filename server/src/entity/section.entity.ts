import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  BeforeInsert,
} from 'typeorm';

import { Repository } from 'typeorm';

import { Channel } from './channel.entity';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  title: string;

  @Column()
  order: number;

  @ManyToMany(() => Channel, (channel: Channel) => channel.sections, {
    cascade: true,
  })
  @JoinTable()
  channels: Array<Channel>;

  constructor(private readonly sectionRepository: Repository<Section>) {}

  // @BeforeInsert()
  // async getSectionsByOrder() {
  //   const lastSection = await this.sectionRepository.findOne({
  //     order: { order: 'DESC' },
  //   });

  //   console.log(lastSection, 'last section');
  // }

  @BeforeInsert()
  async updateOrder() {
    const lastSection = await this.sectionRepository.findOne({
      order: { order: 'DESC' },
    });

    if (lastSection) {
      this.order = lastSection.order + 1;
    } else {
      this.order = 1;
    }
  }
}
