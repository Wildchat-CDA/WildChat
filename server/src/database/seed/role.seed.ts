import { DataSource } from 'typeorm';
import { Role } from '../../entity/role.entity';

export async function seedRoles(dataSource: DataSource) {
  const roleRepository = dataSource.getRepository(Role);
  const existingRoles = await roleRepository.find();

  if (existingRoles.length === 0) {
    const roles = [
      roleRepository.create({ name: 'professeur' }),
      roleRepository.create({ name: 'eleve' }),
    ];

    await roleRepository.save(roles);
  }
}

export async function clearRoles(dataSource: DataSource) {
  const roleRepository = dataSource.getRepository(Role);
  await roleRepository.delete({ name: 'professeur' });
  await roleRepository.delete({ name: 'eleve' });
}
