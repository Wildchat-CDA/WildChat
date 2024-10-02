import { Controller, Get, Put, Param, Body } from '@nestjs/common';
import { RoomService, User } from '../service/room.service';
import { RedisService } from '../service/redis.service';

@Controller('/room')
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly redisService: RedisService,
  ) {}

  @Get()
  getAllUsers(): User[] {
    return this.roomService.users;
  }

  @Get('peerids')
  getAllPeerIds(): string[] {
    return this.roomService.users.map((user) => user.peerID);
  }

  @Put(':roomId/message/:messageId/important')
  async markMessageAsImportant(
    @Param('roomId') roomId: string,
    @Param('messageId') messageId: string,
    @Body() body: { userId: string },
  ) {
    const userIdNumber = parseInt(body.userId, 10);
    await this.redisService.markMessageAsImportant(
      roomId,
      messageId,
      userIdNumber,
    );
    const unreadUsers = await this.redisService.getUnreadUsers(
      roomId,
      messageId,
    );
    return { messageId, unreadUsers };
  }

  @Put(':roomId/message/:messageId/read')
  async markMessageAsRead(
    @Param('roomId') roomId: string,
    @Param('messageId') messageId: string,
    @Body() body: { userId: string },
  ) {
    const userIdNumber = parseInt(body.userId, 10);
    await this.redisService.markMessageAsRead(userIdNumber, messageId, roomId);
    const unreadUsers = await this.redisService.getUnreadUsers(
      roomId,
      messageId,
    );
    return { messageId, unreadUsers };
  }
}
