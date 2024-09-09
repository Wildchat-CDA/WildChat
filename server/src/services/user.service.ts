import { Injectable } from '@nestjs/common';

interface User {
  id: string;
  username: string;
  roomId?: string;
}

@Injectable()
export class UserService {
  private users: Map<string, User> = new Map();

  addUser(id: string, username: string): void {
    this.users.set(id, { id, username });
  }

  removeUser(id: string): void {
    this.users.delete(id);
  }

  getUser(id: string): User | undefined {
    return this.users.get(id);
  }

  updateUserRoom(id: string, roomId: string): void {
    const user = this.users.get(id);
    if (user) {
      user.roomId = roomId;
    }
  }
}
