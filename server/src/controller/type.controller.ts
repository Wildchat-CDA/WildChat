import { Controller, Post, Body, Get } from '@nestjs/common';
import { Type } from 'src/entity/type.entity';
import { TypeService } from 'src/service/type.service';

@Controller('/type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post('/')
  async create(@Body() type: Type): Promise<Type> {
    return await this.typeService.create(type);
  }

  @Get('/')
  async findAll(): Promise<Type[]> {
    return await this.typeService.findAll();
  }
}
