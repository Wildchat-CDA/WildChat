import { DataSource } from 'typeorm';
import { Role } from '../../entity/role.entity';

export async function seedRoles(dataSource: DataSource) {
  const roleRepository = dataSource.getRepository(Role);
  const existingRoles = await roleRepository.find();

  if (existingRoles.length === 0) {
    const roles = [
      roleRepository.create({ name: 'professeur' }),
      roleRepository.create({ name: 'eleve' }),
      roleRepository.create({ name: 'assistant professeur' }),
    ];

    await roleRepository.save(roles);
    console.log('Roles seeded successfully');
  } else {
    console.log('Roles already exist, skipping seeding');
  }
}
