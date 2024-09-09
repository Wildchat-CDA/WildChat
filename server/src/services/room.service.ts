import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomService {
  private rooms: Map<string, Set<string>> = new Map();

  createRoom(roomId: string): void {
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }
  }

  addUserToRoom(roomId: string, userId: string): void {
    if (!this.rooms.has(roomId)) {
      this.createRoom(roomId);
    }
    this.rooms.get(roomId).add(userId);
  }

  removeUserFromRoom(roomId: string, userId: string): void {
    const room = this.rooms.get(roomId);
    if (room) {
      room.delete(userId);
      if (room.size === 0) {
        this.rooms.delete(roomId);
      }
    }
  }

  getUsersInRoom(roomId: string): string[] {
    return Array.from(this.rooms.get(roomId) || []);
  }
}
