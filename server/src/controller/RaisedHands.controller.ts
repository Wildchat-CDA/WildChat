import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RedisService } from '../service/redis.service';

@Controller('raisedHands')
export class RaisedHandsController {
  constructor(private readonly redisService: RedisService) {}

  @Get()
  async getRaisedHands() {
    return await this.redisService.getRaisedHands();
  }

  @Post()
  async raiseHand(
    @Body()
    data: {
      userId: number;
      userName: string;
      type: 'self' | 'table';
      table: 'string';
    },
  ) {
    await this.redisService.raiseHand(data);
    return { success: true, message: 'Hand raised successfully' };
  }

  @Delete(':userId/:type')
  async lowerHand(
    @Param('userId') userId: string,
    @Param('type') type: 'self' | 'table',
  ) {
    await this.redisService.lowerHand({ userId: parseInt(userId), type });
    return { success: true, message: 'Hand lowered successfully' };
  }
}
