import { DataSource } from 'typeorm';
import { Config } from '../../entity/config.entity';
import { Type } from '../../entity/type.entity';

export async function seedConfigs(dataSource: DataSource) {
  const configRepository = dataSource.getRepository(Config);
  const typeRepository = dataSource.getRepository(Type);

  const existingConfigs = await configRepository.find();

  if (existingConfigs.length === 0) {
    const types = await typeRepository.find();

    for (const type of types) {
      const config = configRepository.create({
        maxSlot: Math.floor(Math.random() * 6) + 1,
        type: type,
      });

      await configRepository.save(config);
    }

    console.log('Configs seeded successfully');
  } else {
    console.log('Configs already exist, skipping seeding');
  }
}
