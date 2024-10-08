import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { seedRoles } from './role.seed';
import { seedChannels } from './channel.seed';
import { seedSections } from './section.seed';
import { seedTypes } from './type.seed';
import { seedUsers } from './user.seed';
import { seedSectionChannels } from './section_channels.seed';

async function bootstrap(tables?: string[]) {
  console.log('Starting seeding process...');
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  const seedFunctions = {
    role: seedRoles,
    channel: seedChannels,
    section: seedSections,
    type: seedTypes,
    user: seedUsers,
    section_channels: seedSectionChannels,
  };

  try {
    for (const [table, seedFunction] of Object.entries(seedFunctions)) {
      if (!tables || tables.includes(table)) {
        console.log(`Seeding ${table}...`);
        await seedFunction(dataSource);
        console.log(`${table} seeded successfully`);
      }
    }
    console.log('Seeding process completed successfully');
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await dataSource.destroy();
    await app.close();
  }
}

const [, , ...tables] = process.argv;

bootstrap(tables)
  .catch((error) => console.error('Bootstrap error:', error))
  .finally(() => {
    console.log('Seeding script finished executing');
    process.exit();
  });
