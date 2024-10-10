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

  setClientToPeer(client) {
    this.redisService.setClientToPeer(client);
  }

  async deletePeerFromClient(client) {
    return this.redisService.deletePeerFromClient(client);
  }

  addUserOnRoom(data, client) {
    this.redisService.postPeerIdOnRoom(data, client);
  }

  deletePeerIdUser(data) {
    try {
      this.redisService.deletePeerIdUser(data);
    } catch (err) {
      console.error(err);
    }
  }
}
