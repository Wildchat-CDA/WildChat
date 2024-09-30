import { DataSource } from 'typeorm';
import { Section } from '../../entity/section.entity';

export async function seedSections(dataSource: DataSource) {
  const sectionRepository = dataSource.getRepository(Section);
  const existingSections = await sectionRepository.find();

  if (existingSections.length === 0) {
    const sections = [
      sectionRepository.create({
        title: 'Classroom',
        isClassRoom: true,
        order: 1,
      }),
      sectionRepository.create({
        title: 'Library',
        isClassRoom: false,
        order: 2,
      }),
    ];

    await sectionRepository.save(sections);
    console.log('Sections seeded successfully');
  } else {
    console.log('Sections already exist, skipping seeding');
  }
}
