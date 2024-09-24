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

  addUserOnRoom(peerId, roomUuid, userUuid) {
    console.log('peerID', peerId);
    console.log('room :', roomUuid);
    console.log('userUuid : ', userUuid);
    const data = { peerId, roomUuid, userUuid };
    this.redisService.postPeerIdOnRoom(data);
  }
}
