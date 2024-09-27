import { Injectable } from '@nestjs/common';
import { RedisService } from './redis.service';

@Injectable()
export class RoomService {
  private _userPeerId: string;
  private _allRooms: string[];
  constructor(private readonly redisService: RedisService) {
    this._userPeerId = '';
    this._allRooms = [];
  }

  addUserOnRoom(peerId, roomUuid) {
    console.log('peerID', peerId);
    console.log('room :', roomUuid);

    const data = { peerId, roomUuid };
    this.redisService.postPeerIdOnRoom(data);
  }

  deletePeerIdUser(data) {
    this.redisService.deletePeerIdUser(data);
  }
}
