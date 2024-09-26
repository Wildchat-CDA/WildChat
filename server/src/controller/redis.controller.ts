import { Controller, Inject, Get, Param, Put, Delete } from '@nestjs/common';
import { MessageBody } from '@nestjs/websockets';
import { RedisService } from 'src/service/redis.service';
import {
  IMessageUpdatePayload,
  IMessageDeletePayload,
} from '../../../common/interface/messageInterface';

@Controller('/room')
export class RedisController {
  constructor(@Inject() private readonly redisService: RedisService) {}

  @Get(':roomId')
  public async getAllMessages(@Param('roomId') roomId: string) {
    return await this.redisService.getMessages(roomId);
  }

  @Get('/peer/:roomId')
  public async getAllPeerId(@Param('roomId') roomId: string) {
    return await this.redisService.getPeerId(roomId);
  }

  @Put(':roomId/message')
  public async updateMessage(
    @Param('roomId') roomId: string,
    @MessageBody() data: IMessageUpdatePayload,
  ) {
    return await this.redisService.updateMessage(data, roomId);
  }

  @Delete(':roomId/message/:index')
  public async deleteMessage(@Param() params: IMessageDeletePayload) {
    return await this.redisService.deleteMessage(params);
  }
}
