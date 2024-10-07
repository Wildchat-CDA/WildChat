import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

export interface User {
  uuid: string;
  peerID: string;
}

@Injectable()
export class RoomService {
  private _users: User[];
  private _channelUUID: string;

  constructor() {
    this._users = [];
    this._channelUUID = uuidv4(); // UUID fixe pour le canal vocal
  }

  addUser(peerID: string): string {
    const existingUser = this._users.find((user) => user.peerID === peerID);
    if (existingUser) {
      return existingUser.uuid;
    }
    const uuid = uuidv4();
    this._users.push({ uuid, peerID });
    return uuid;
  }

  removeUser(peerID: string): void {
    this._users = this._users.filter((user) => user.peerID !== peerID);
  }

  get users(): User[] {
    console.log('USER : ', this._users);
    return [...this._users];
  }

  get channelUUID(): string {
    return this._channelUUID;
  }

  getUserByPeerID(peerID: string): User | undefined {
    console.log('getUserByPeerID');
    return this._users.find((user) => user.peerID === peerID);
  }

  getUserByUUID(uuid: string): User | undefined {
    console.log('getUserByUUID');
    return this._users.find((user) => user.uuid === uuid);
  }

  isPeerConnected(peerID: string): boolean {
    console.log('isPeerConnected');
    return this._users.some((user) => user.peerID === peerID);
  }

  updateUserPeerID(uuid: string, newPeerID: string): boolean {
    console.log('updateUserPeerID');
    const userIndex = this._users.findIndex((user) => user.uuid === uuid);
    if (userIndex !== -1) {
      this._users[userIndex].peerID = newPeerID;
      return true;
    }
    return false;
  }
}
