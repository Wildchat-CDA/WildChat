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
import { RoomService } from './room.service';
import { IMessagePostPayload } from '../../../common/interface/messageInterface';

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

  handleConnection(client: Socket) {
    if (client) {
      this.sendInitialPresenceList(client);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`client ${client.id} disconnected`);
    const peerID = this.socketToPeerMap.get(client.id);
    if (peerID) {
      this.socketToPeerMap.delete(client.id);
    }
  }

  @SubscribeMessage('getPresence')
  handleGetPresence(client: Socket) {
    this.sendInitialPresenceList(client);
  }

  private async sendInitialPresenceList(client: Socket) {
    try {
      const presenceData = await this.presenceService.getAllUsersPresence();
      const presenceList = presenceData.map(({ user, status }) => ({
        id: user.id,
        name: user.name,
        firstName: user.firstName,
        status,
      }));
      client.emit('initialPresence', presenceList);
    } catch (error) {
      console.error('Error fetching initial presence list:', error);
    }
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

  @SubscribeMessage('updatePresence')
  async handleUpdatePresence(
    @MessageBody() data: { userId: number; status: 'online' | 'offline' },
  ) {
    await this.presenceService.updatePresence(data.userId, data.status);
    this.server.emit('presenceUpdate', data);
  }
}
