import { DataSource } from 'typeorm';
import { Type } from '../../entity/type.entity';

export async function seedTypes(dataSource: DataSource) {
  const typeRepository = dataSource.getRepository(Type);
  const existingTypes = await typeRepository.find();

  if (existingTypes.length === 0) {
    const types = [
      typeRepository.create({ name: 'Audio' }),
      typeRepository.create({ name: 'Video' }),
      typeRepository.create({ name: 'Text' }),
    ];

    await typeRepository.save(types);
    console.log('Types seeded successfully');
  } else {
    console.log('Types already exist, skipping seeding');
  }
}
