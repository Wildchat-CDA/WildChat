import { InjectRepository } from '@nestjs/typeorm';
import { Config } from 'src/entity/config.entity';

import { Repository } from 'typeorm';
import { Type } from '../entity/type.entity';

export class ConfigService {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  async findAll(): Promise<Config[]> {
    return this.configRepository.find({
      relations: {
        type: true,
      },
    });
  }

  async create(config: Config): Promise<Config> {
    return await this.configRepository.save(config);
  }

  async addType(configId: number, typeId: number): Promise<Config> {
    const config = await this.configRepository.findOneBy({ id: configId });
    const type = await this.typeRepository.findOneBy({ id: typeId });

    config.type = type;

    return await this.configRepository.save(config);
  }
}
