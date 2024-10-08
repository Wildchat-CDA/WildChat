import { Controller, Get } from '@nestjs/common';
import { RoomService, User } from '../service/roomOld/room.service';

@Controller('/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  /** Get All users from General room */
  @Get()
  getAllUsers(): User[] {
    return this.roomService.users;
  }

  /** Get All peerIds from General room */
  @Get('peerids')
  getAllPeerIds(): string[] {
    return this.roomService.users.map((user) => user.peerID);
  }
}
