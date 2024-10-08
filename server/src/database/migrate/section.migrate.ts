import { DataSource } from 'typeorm';
import { Section } from '../../entity/section.entity';

export async function updateSections(
  dataSource: DataSource,
  sectionsToEnsure: Partial<Section>[],
) {
  const sectionRepository = dataSource.getRepository(Section);
  const existingSections = await sectionRepository.find();

  for (const sectionData of sectionsToEnsure) {
    if (
      !existingSections.some((section) => section.title === sectionData.title)
    ) {
      await sectionRepository.save(sectionRepository.create(sectionData));
      console.log(`Section '${sectionData.title}' ajoutée`);
    } else {
      console.log(`Section '${sectionData.title}' existe déjà`);
    }
  }

  console.log('Mise à jour des sections terminée');
}

export async function clearSections(dataSource: DataSource) {
  const sectionRepository = dataSource.getRepository(Section);
  await sectionRepository.clear();
  console.log('Toutes les sections ont été supprimées');
}
