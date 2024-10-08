import { DataSource } from 'typeorm';
import { User } from '../../entity/user.entity';
import { Role } from '../../entity/role.entity';

export async function updateUsers(
  dataSource: DataSource,
  usersToEnsure: Partial<User>[],
) {
  const userRepository = dataSource.getRepository(User);
  const roleRepository = dataSource.getRepository(Role);
  const existingUsers = await userRepository.find();

  for (const userData of usersToEnsure) {
    if (!existingUsers.some((user) => user.email === userData.email)) {
      const role = await roleRepository.findOne({
        where: { name: userData.role.name },
      });
      if (role) {
        const newUser = userRepository.create({
          ...userData,
          role: role,
        });
        await userRepository.save(newUser);
        console.log(`Utilisateur '${userData.email}' ajouté`);
      } else {
        console.log(
          `Rôle '${userData.role.name}' non trouvé pour l'utilisateur '${userData.email}'`,
        );
      }
    } else {
      console.log(`Utilisateur '${userData.email}' existe déjà`);
    }
  }

  console.log('Mise à jour des utilisateurs terminée');
}

export async function clearUsers(dataSource: DataSource) {
  const userRepository = dataSource.getRepository(User);
  await userRepository.clear();
  console.log('Tous les utilisateurs ont été supprimés');
}
