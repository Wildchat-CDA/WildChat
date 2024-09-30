import { DataSource } from 'typeorm';
import { Location } from '../../entity/location.entity';
import { createLocationFactory } from '../factory/location.factory';

export async function seedLocations(dataSource: DataSource) {
  const locationRepository = dataSource.getRepository(Location);
  const existingLocations = await locationRepository.find();

  if (existingLocations.length === 0) {
    const locations = Array(5)
      .fill(null)
      .map(() => createLocationFactory());
    await locationRepository.save(locations);
    console.log('Locations seeded successfully');
  } else {
    console.log('Locations already exist, skipping seeding');
  }
}
