import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from './redis.service';
import { IMessagePostPayload } from '../../../common/interface/messageInterface';
import { RoomService } from './room.service';
import { PresenceService } from './presence.service';

interface HandRaiseData {
  userId: number;
  userName: string;
  type: 'self' | 'table';
  table: string;
  timestamp: number;
}

@WebSocketGateway({
  cors: true,
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private socketToPeerMap = new Map<string, string>();

  constructor(
    private readonly redisService: RedisService,
    private readonly roomService: RoomService,
    private readonly presenceService: PresenceService
  ) {}

  afterInit() {
    console.log('WebSocket server initialized');
  }

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    await this.presenceService.setUserPresence(userId, 'online');
    this.server.emit('presenceUpdate', { userId, status: 'online' });
    console.log(`Client connected: ${client.id}`);
  }

  async handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId as string;
    await this.presenceService.setUserPresence(userId, 'offline');
    this.server.emit('presenceUpdate', { userId, status: 'offline' });

    console.log(`Client disconnected: ${client.id}`);
    const peerID = this.socketToPeerMap.get(client.id);
    if (peerID) {
      this.leaveChannel({ peerID }, client);
      this.socketToPeerMap.delete(client.id);
    }
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: IMessagePostPayload) {
    console.log(data, 'Message received');
    await this.redisService.postMessage(data);
    this.server.emit('message', data);
  }

  @SubscribeMessage('raiseHand')
  async handleRaiseHand(
    @MessageBody()
    data: Omit<HandRaiseData, 'timestamp'>,
  ) {
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

  @SubscribeMessage('join-channel')
  joinChannel(
    @MessageBody() data: { peerID: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`New user joined: PeerID ${data.peerID}`);
    const userUUID = this.roomService.addUser(data.peerID);
    client.join(this.roomService.channelUUID);
    this.socketToPeerMap.set(client.id, data.peerID);

    this.server.to(this.roomService.channelUUID).emit('user-joined', {
      peerID: data.peerID,
      uuid: userUUID,
      channelUUID: this.roomService.channelUUID,
      users: this.roomService.users,
    });

    return { uuid: userUUID, channelUUID: this.roomService.channelUUID };
  }

  @SubscribeMessage('leave-channel')
  leaveChannel(
    @MessageBody() data: { peerID: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`User left: PeerID ${data.peerID}`);
    const user = this.roomService.getUserByPeerID(data.peerID);
    if (user) {
      this.roomService.removeUser(data.peerID);
      client.leave(this.roomService.channelUUID);

      this.server.to(this.roomService.channelUUID).emit('user-disconnected', {
        peerID: data.peerID,
        uuid: user.uuid,
        users: this.roomService.users,
      });
      this.socketToPeerMap.delete(client.id);
    }
  }

  @SubscribeMessage('request-channel-info')
  requestChannelInfo() {
    return {
      channelUUID: this.roomService.channelUUID,
      users: this.roomService.users,
    };
  }

  @SubscribeMessage('update-peer-id')
  updatePeerID(@MessageBody() data: { oldPeerID: string; newPeerID: string }) {
    const user = this.roomService.getUserByPeerID(data.oldPeerID);
    if (user) {
      this.roomService.updateUserPeerID(user.uuid, data.newPeerID);
      this.server.to(this.roomService.channelUUID).emit('peer-id-updated', {
        oldPeerID: data.oldPeerID,
        newPeerID: data.newPeerID,
        uuid: user.uuid,
      });
    }
  }
  

//methode pour que je puisse recuperer la presence de tous les eleves
  @SubscribeMessage('getPresence')
  async handleGetPresence() {
    const presences = await this.presenceService.getAllUsersPresence();
    return presences;
  }
}
