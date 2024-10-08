import { DataSource } from 'typeorm';
import { updateChannels } from '../migrate/channel.migrate';

export const channelsToEnsure = [
  { title: 'Annonces Générales', slot: 1, configId: 1 },
  { title: 'Annonces Administratives', slot: 1, configId: 2 },
  { title: 'Bureau du professeur', slot: 1, configId: 3 },
  { title: "Bureau de l'assistant", slot: 1, configId: 4 },
  { title: 'Table principale', slot: 1, configId: 5 },
  { title: 'Table des dailys', slot: 1, configId: 6 },
];

export async function seedChannels(dataSource: DataSource) {
  await updateChannels(dataSource, channelsToEnsure);
}
