import { Controller, Get } from '@nestjs/common';
import { RoomService } from '../service/room.service';

@Controller('/room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  /** Get All peerIds from General room   */
  @Get()
  getAllPeerIds(): string[] {
    return this.roomService.peerIdList;
  }
}
