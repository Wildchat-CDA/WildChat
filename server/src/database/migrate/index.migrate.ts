import { NestFactory } from '@nestjs/core';
import { AppModule } from '../../app.module';
import { DataSource } from 'typeorm';
import { updateRoles, clearRoles } from './role.migrate';
import { updateChannels, clearChannels } from './channel.migrate';
import { updateSections, clearSections } from './section.migrate';
import { updateTypes, clearTypes } from './type.migrate';
import { updateUsers, clearUsers } from './user.migrate';

import { rolesToEnsure } from '../seed/role.seed';
import { channelsToEnsure } from '../seed/channel.seed';
import { sectionsToEnsure } from '../seed/section.seed';
import { typesToEnsure } from '../seed/type.seed';
import { usersToEnsure } from '../seed/user.seed';

async function bootstrap(action: 'update' | 'clear', table?: string) {
  console.log(`Starting ${action} process...`);
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  try {
    if (action === 'update') {
      if (!table || table === 'role') {
        console.log('Updating roles...');
        await updateRoles(dataSource, rolesToEnsure);
        console.log('Roles updated successfully');
      }
      if (!table || table === 'channel') {
        console.log('Updating channels...');
        await updateChannels(dataSource, channelsToEnsure);
        console.log('Channels updated successfully');
      }
      if (!table || table === 'section') {
        console.log('Updating sections...');
        await updateSections(dataSource, sectionsToEnsure);
        console.log('Sections updated successfully');
      }
      if (!table || table === 'type') {
        console.log('Updating types...');
        await updateTypes(dataSource, typesToEnsure);
        console.log('Types updated successfully');
      }
      if (!table || table === 'user') {
        console.log('Updating users...');
        await updateUsers(dataSource, usersToEnsure);
        console.log('Users updated successfully');
      }
    } else if (action === 'clear') {
      if (!table || table === 'user') {
        console.log('Clearing users...');
        await clearUsers(dataSource);
        console.log('Users cleared successfully');
      }
      if (!table || table === 'channel') {
        console.log('Clearing channels...');
        await clearChannels(dataSource);
        console.log('Channels cleared successfully');
      }
      if (!table || table === 'section') {
        console.log('Clearing sections...');
        await clearSections(dataSource);
        console.log('Sections cleared successfully');
      }
      if (!table || table === 'type') {
        console.log('Clearing types...');
        await clearTypes(dataSource);
        console.log('Types cleared successfully');
      }
      if (!table || table === 'role') {
        console.log('Clearing roles...');
        await clearRoles(dataSource);
        console.log('Roles cleared successfully');
      }
    }
    console.log(
      `${action.charAt(0).toUpperCase() + action.slice(1)} process completed successfully`,
    );
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
