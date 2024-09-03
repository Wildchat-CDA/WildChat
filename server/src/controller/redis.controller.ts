import { Controller, Inject, Get, Param, Put } from '@nestjs/common';
import { MessageBody } from '@nestjs/websockets';
import { RedisService } from 'src/service/redis.service';
import { MessageUpdateData } from 'src/types/payload.types';

@Controller('/room')
export class RedisController {
  constructor(@Inject() private readonly redisService: RedisService) {}

  @Get(':roomId?') // 'id' optionnel
  public async getAllMessages(@Param('roomId') roomId: string) {
    return await this.redisService.getMessages(roomId);
  }

  @Put(':roomId/message')
  public async updateMessage(
    @Param('roomId') roomId: string,
    @MessageBody() data: MessageUpdateData,
  ) {
    console.log('messageUpdate : ', data.messageUpdate.index);
    return await this.redisService.updateMessage(
      roomId,
      data.messageUpdate.index,
      data.messageUpdate.message,
    );
  }
}
