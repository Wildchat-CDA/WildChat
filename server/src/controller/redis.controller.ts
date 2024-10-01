import {
  Controller,
  Inject,
  Get,
  Param,
  Put,
  Delete,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
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
    try {
      return await this.redisService.getMessages(roomId);
    } catch (error) {
      console.error('Error getting messages:', error);
      throw new HttpException(
        'Failed to retrieve messages',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':roomId/message')
  public async updateMessage(
    @Param('roomId') roomId: string,
    @MessageBody() data: IMessageUpdatePayload,
  ) {
    if (!roomId || !data.name || data.index === undefined || !data.message) {
      throw new BadRequestException('Invalid message update data');
    }
    try {
      await this.redisService.updateMessage(data, roomId);
      return { success: true };
    } catch (error) {
      console.error('Error updating message:', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':roomId/message/:index')
  public async deleteMessage(@Param() params: IMessageDeletePayload) {
    if (!params.roomId || params.index === undefined) {
      throw new BadRequestException('Invalid message delete data');
    }
    try {
      await this.redisService.deleteMessage(params);
      return { success: true };
    } catch (error) {
      console.error('Error deleting message:', error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
