import { DataSource } from 'typeorm';
import { Type } from '../../entity/type.entity';

export async function updateTypes(
  dataSource: DataSource,
  typesToEnsure: string[],
) {
  const typeRepository = dataSource.getRepository(Type);
  const existingTypes = await typeRepository.find();

  for (const typeName of typesToEnsure) {
    if (!existingTypes.some((type) => type.name === typeName)) {
      await typeRepository.save(typeRepository.create({ name: typeName }));
      console.log(`Type '${typeName}' ajouté`);
    } else {
      console.log(`Type '${typeName}' existe déjà`);
    }
  }

  console.log('Mise à jour des types terminée');
}

export async function clearTypes(dataSource: DataSource) {
  const typeRepository = dataSource.getRepository(Type);
  await typeRepository.clear();
  console.log('Tous les types ont été supprimés');
}
