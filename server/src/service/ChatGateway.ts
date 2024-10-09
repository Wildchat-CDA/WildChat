import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PresenceService } from './presence.service';
import { RedisService } from './redis.service';
import { IMessagePostPayload } from '../../../common/interface/messageInterface';
import { RoomService } from './room.service';

interface HandRaiseData {
  userId: number;
  userName: string;
  type: 'self' | 'table';
  table: string;
  timestamp: number;
}

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  private socketToPeerMap = new Map<string, string>();

  constructor(
    private readonly presenceService: PresenceService,
    private readonly redisService: RedisService,
    private readonly roomService: RoomService,
  ) {}

  async handleConnection(client: Socket) {
    if (client) {
      await this.sendInitialPresenceList(client);
      const userId = this.getUserIdFromSocket(client);
      if (userId) {
        await this.presenceService.setUserPresence(userId, 'online');
        this.server.emit('presenceUpdate', { userId, status: 'online' });
      }
    }
  }

  async handleDisconnect(client: Socket) {
    console.log(`client ${client.id} disconnected`);
    const userId = this.getUserIdFromSocket(client);
    if (userId) {
      await this.presenceService.setUserPresence(userId, 'offline');
      this.server.emit('presenceUpdate', { userId, status: 'offline' });
    }
    const peerID = this.socketToPeerMap.get(client.id);
    if (peerID) {
      this.socketToPeerMap.delete(client.id);
    }
  }

  @SubscribeMessage('getPresence')
  async handleGetPresence(client: Socket) {
    await this.sendInitialPresenceList(client);
  }

  private async sendInitialPresenceList(client: Socket) {
    const presenceList = await this.presenceService.getAllUsersPresence();
    client.emit('initialPresence', presenceList);
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: IMessagePostPayload) {
    await this.redisService.postMessage(data);
    this.server.emit('message', data);
  }

  @SubscribeMessage('raiseHand')
  async handleRaiseHand(@MessageBody() data: Omit<HandRaiseData, 'timestamp'>) {
    const handRaiseData: HandRaiseData = {
      ...data,
      timestamp: Date.now(),
    };
    await this.redisService.raiseHand(handRaiseData);
    const raisedHands = await this.redisService.getRaisedHands();
    this.server.emit('raisedHandsUpdate', raisedHands);
  }

  @SubscribeMessage('lowerHand')
  async handleLowerHand(
    @MessageBody() data: { userId: number; type: 'self' | 'table' },
  ) {
    await this.redisService.lowerHand(data);
    const raisedHands = await this.redisService.getRaisedHands();
    this.server.emit('raisedHandsUpdate', raisedHands);
  }

  @SubscribeMessage('join-room')
  async joinChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { peerId: string; roomUuid: string; name: string },
  ) {
    try {
      client.join(data.roomUuid);
      await this.roomService.addUserOnRoom(data, client);
      this.server.to(data.roomUuid).emit('join-room', {
        peerId: data.peerId,
        name: data.name,
        roomUuid: data.roomUuid,
      });
      this.server.emit('join', {
        peerId: data.peerId,
        name: data.name,
        roomUuid: data.roomUuid,
      });
    } catch (err) {
      console.error(err);
    }
  }

  @SubscribeMessage('leave-room')
  async leaveChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { peerId: string; roomUuid: string; name: string },
  ) {
    try {
      this.server.to(data.roomUuid).emit('leave-room', {
        peerId: data.peerId,
        name: data.name,
        roomUuid: data.roomUuid,
      });
      this.server.emit('leave', {
        peerId: data.peerId,
        name: data.name,
        roomUuid: data.roomUuid,
        client: client.id,
      });
      client.leave(data.roomUuid);
      const payload = { ...data, clientId: client.id };
      await this.roomService.deletePeerIdUser(payload);
    } catch (err) {
      console.error(err);
    }
  }

  private getUserIdFromSocket(client: Socket): number | null {
    return Math.floor(Math.random() * 1000) + 1;
  }
}
