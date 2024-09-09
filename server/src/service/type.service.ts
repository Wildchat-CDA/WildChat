import { InjectRepository } from '@nestjs/typeorm';
import { Type } from 'src/entity/type.entity';
import { Repository } from 'typeorm';

export class TypeService {
  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>,
  ) {}

  async create(type: Type): Promise<Type> {
    return await this.typeRepository.save(type);
  }

  async findAll(): Promise<Type[]> {
    return this.typeRepository.find();
  }
}
