import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
