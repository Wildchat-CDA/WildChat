import { DataSource } from 'typeorm';
import { Role } from '../../entity/role.entity';

export async function updateRoles(
  dataSource: DataSource,
  rolesToEnsure: string[],
) {
  const roleRepository = dataSource.getRepository(Role);
  const existingRoles = await roleRepository.find();

  for (const roleName of rolesToEnsure) {
    if (!existingRoles.some((role) => role.name === roleName)) {
      await roleRepository.save(roleRepository.create({ name: roleName }));
      console.log(`Rôle '${roleName}' ajouté`);
    } else {
      console.log(`Rôle '${roleName}' existe déjà`);
    }
  }

  console.log('Mise à jour des rôles terminée');
}

export async function clearRoles(dataSource: DataSource) {
  const roleRepository = dataSource.getRepository(Role);
  await roleRepository.clear();
  console.log('Tous les rôles ont été supprimés');
}
