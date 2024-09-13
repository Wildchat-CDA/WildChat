import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
  private _peerIdList: string[];

  constructor() {
    this._peerIdList = [];
  }

  addClient(peerId: string): void {
    if (!this._peerIdList.find((id) => id === peerId)) {
      this._peerIdList.push(peerId);
    }
  }

  removeClient(peerId: string): void {
    this._peerIdList.filter((id) => id !== peerId);
  }

  get peerIdList() {
    return this._peerIdList;
  }
}
