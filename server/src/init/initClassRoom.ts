import { SectionService } from 'src/service/section.service';

export class initClassRoom {
  constructor(private readonly sectionService: SectionService) {}

  initClassRoom = () => {
    this.sectionService.createClassRoomWithChannels();
    this.sectionService.createSectionWithChannels('JavaScript');
  };
}
