import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Config } from 'src/entity/config.entity';
import { ConfigService } from 'src/service/config.service';

@Controller('/config')
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get('/')
  async findAll(): Promise<Config[]> {
    return await this.configService.findAll();
  }

  @Post('/')
  async create(@Body() config: Config): Promise<Config> {
    return await this.configService.create(config);
  }

  @Put('/:configId/type/:typeId')
  async addType(
    @Param('configId') configId: number,
    @Param('typeId') typeId: number,
  ) {
    try {
      return await this.configService.addType(configId, typeId);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
