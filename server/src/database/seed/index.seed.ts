import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { seedRoles } from './role.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  try {
    await seedRoles(dataSource);
  } catch (error) {
    console.error('Error during seeding:', error);
  } finally {
    await dataSource.destroy();
    await app.close();
  }
}

bootstrap()
  .catch((error) => console.error('Bootstrap error:', error))
  .finally(() => process.exit());
