import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  name: string;

  @OneToMany(() => User, (user) => user.role)
  users: Array<User>;

  static initRoles(): Role[] {
    const professeur = new Role();
    professeur.name = 'professeur';

    const eleve = new Role();
    eleve.name = 'eleve';

    return [professeur, eleve];
  }
}
