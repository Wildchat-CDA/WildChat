import { SectionService } from 'src/service/section.service';
import { getRepository } from 'typeorm';
import { createConnection } from 'typeorm';

import { initClassRoom } from './initClassRoom';
import { Repository } from 'typeorm';
import { Section } from 'src/entity/section.entity';
import { Channel } from 'src/entity/channel.entity';
import { Type } from 'src/entity/type.entity';
import { Config } from 'src/entity/config.entity';

const sectionRepository: Repository<Section> = getRepository(Section);
const channelRepository: Repository<Channel> = getRepository(Channel);
const configRepository: Repository<Config> = getRepository(Config);
const typeRepository: Repository<Type> = getRepository(Type);

createConnection()
  .then(() => {
    const sectionService = new SectionService(
      sectionRepository,
      channelRepository,
      configRepository,
      typeRepository,
    );
    const init = new initClassRoom(sectionService);
    init.initClassRoom();
  })

  .catch((error) =>
    console.log('Error while connecting to the database:', error),
  );
