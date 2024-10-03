import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { seedRoles } from './role.seed';

async function bootstrap(tables?: string[]) {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  try {
    if (!tables || tables.includes('role')) {
      await seedRoles(dataSource);
    }
    console.log('Seeding completed successfully');
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
  .finally(() => process.exit());
