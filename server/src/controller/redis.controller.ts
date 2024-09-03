import { Controller, Inject, Get, Param } from '@nestjs/common';
import { RedisService } from 'src/service/redis.service';

@Controller('/room')
export class RedisController {
  constructor(@Inject() private readonly redisService: RedisService) {}

  @Get(':id?') // 'id' optionnel
  public async getAllMessages(@Param('id') id: string) {
    const roomId = id ?? '1'; // Utilise '1' si 'id' est undefined
    return await this.redisService.getMessages(roomId);
  }
}
