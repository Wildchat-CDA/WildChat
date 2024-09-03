import { Controller, Inject, Get } from '@nestjs/common';
import { RedisService } from 'src/service/redis.service';

@Controller('/message')
export class RedisController {
  constructor(@Inject() private readonly redisService: RedisService) {}

  @Get()
  public async getAllMessages() {
    return await this.redisService.client.lRange(`room:1`, 0, -1);
  }
}
