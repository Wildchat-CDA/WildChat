import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

interface User {
  id: string;
  username: string;
  roomId?: string;
}

@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('WebsocketGateway');
  private users: Map<string, User> = new Map();
  private rooms: Map<string, Set<string>> = new Map();

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
    this.removeUser(client.id);
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, payload: { username: string; roomId: string }) {
    const { username, roomId } = payload;
    this.addUser(client.id, username, roomId);
    client.join(roomId);

    this.server.to(roomId).emit('userJoined', { userId: client.id, username });
    client.emit('roomJoined', { roomId, users: this.getUsersInRoom(roomId) });

    this.logger.log(`User ${username} joined room ${roomId}`);
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket) {
    const user = this.users.get(client.id);
    if (user && user.roomId) {
      this.removeUserFromRoom(client.id, user.roomId);
      client.leave(user.roomId);
      this.server
        .to(user.roomId)
        .emit('userLeft', { userId: client.id, username: user.username });
      this.logger.log(`User ${user.username} left room ${user.roomId}`);
    }
  }

  @SubscribeMessage('chatMessage')
  handleChatMessage(client: Socket, payload: { message: string }) {
    const user = this.users.get(client.id);
    if (user && user.roomId) {
      this.server.to(user.roomId).emit('newChatMessage', {
        userId: client.id,
        username: user.username,
        message: payload.message,
      });
    }
  }

  @SubscribeMessage('offer')
  handleOffer(
    client: Socket,
    payload: { targetId: string; offer: RTCSessionDescriptionInit },
  ) {
    const user = this.users.get(client.id);
    if (user && user.roomId) {
      this.server.to(payload.targetId).emit('offer', {
        from: client.id,
        offer: payload.offer,
      });
    }
  }

  @SubscribeMessage('answer')
  handleAnswer(
    client: Socket,
    payload: { targetId: string; answer: RTCSessionDescriptionInit },
  ) {
    const user = this.users.get(client.id);
    if (user && user.roomId) {
      this.server.to(payload.targetId).emit('answer', {
        from: client.id,
        answer: payload.answer,
      });
    }
  }

  @SubscribeMessage('iceCandidate')
  handleIceCandidate(
    client: Socket,
    payload: { targetId: string; candidate: RTCIceCandidateInit },
  ) {
    const user = this.users.get(client.id);
    if (user && user.roomId) {
      this.server.to(payload.targetId).emit('iceCandidate', {
        from: client.id,
        candidate: payload.candidate,
      });
    }
  }

  @SubscribeMessage('initializeCall')
  handleInitializeCall(client: Socket, payload: { targetId: string }) {
    const user = this.users.get(client.id);
    if (user && user.roomId) {
      this.server.to(payload.targetId).emit('incomingCall', {
        from: client.id,
        username: user.username,
      });
      this.logger.log(
        `User ${user.username} initiated a call to ${payload.targetId}`,
      );
    }
  }

  private addUser(userId: string, username: string, roomId: string) {
    this.users.set(userId, { id: userId, username, roomId });
    if (!this.rooms.has(roomId)) {
      this.rooms.set(roomId, new Set());
    }
    this.rooms.get(roomId).add(userId);
  }

  private removeUser(userId: string) {
    const user = this.users.get(userId);
    if (user && user.roomId) {
      this.removeUserFromRoom(userId, user.roomId);
    }
    this.users.delete(userId);
  }

  private removeUserFromRoom(userId: string, roomId: string) {
    const room = this.rooms.get(roomId);
    if (room) {
      room.delete(userId);
      if (room.size === 0) {
        this.rooms.delete(roomId);
      }
    }
  }

  private getUsersInRoom(roomId: string): User[] {
    const room = this.rooms.get(roomId);
    if (!room) return [];
    return Array.from(room)
      .map((userId) => this.users.get(userId))
      .filter(Boolean);
  }
}
