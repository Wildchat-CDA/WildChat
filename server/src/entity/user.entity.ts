import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Role } from './role.entity';
import { Channel } from './channel.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @Column({ length: 150 })
  firstName: string;

  @Column({ length: 150 })
  email: string;

  @Column({ length: 150 })
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToMany(() => Channel)
  @JoinTable()
  channels: Array<Channel>;
}
