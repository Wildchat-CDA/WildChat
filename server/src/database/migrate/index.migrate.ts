import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { updateRoles, clearRoles } from './role.migrate';
import { rolesToEnsure } from '../seed/role.seed';

async function bootstrap(action: 'update' | 'clear', table?: string) {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  try {
    if (action === 'update') {
      if (!table || table === 'role') {
        await updateRoles(dataSource, rolesToEnsure);
      }
      // Ajoutez ici d'autres fonctions de mise à jour
    } else if (action === 'clear') {
      if (!table || table === 'role') await clearRoles(dataSource);
      // Ajoutez ici d'autres fonctions de nettoyage
    }
  } catch (error) {
    console.error(`Error during ${action}:`, error);
  } finally {
    await dataSource.destroy();
    await app.close();
  }
}

const [, , action, table] = process.argv;
bootstrap(action as 'update' | 'clear', table)
  .catch((error) => console.error('Bootstrap error:', error))
  .finally(() => process.exit());
