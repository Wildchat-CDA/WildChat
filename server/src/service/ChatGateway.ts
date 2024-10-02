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
import { StudentService } from './student.service';
import { PresenceSimulatorService } from './presence-simulator.service';
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
    private readonly studentService: StudentService,
    private readonly presenceSimulatorService: PresenceSimulatorService,
    private readonly redisService: RedisService,
    private readonly roomService: RoomService,
  ) {
    this.presenceSimulatorService.onPresenceUpdate((updatedStudent) => {
      this.server.emit('presenceUpdate', updatedStudent);
    });
  }

  handleConnection(client: Socket) {
    this.sendInitialPresenceList(client);
  }

  handleDisconnect(client: Socket) {
    const peerID = this.socketToPeerMap.get(client.id);
    if (peerID) {
      // this.leaveChannel({ peerID }, client);
      this.socketToPeerMap.delete(client.id);
    }
  }

  @SubscribeMessage('getPresence')
  handleGetPresence(client: Socket) {
    this.sendInitialPresenceList(client);
  }

  private sendInitialPresenceList(client: Socket) {
    const students = this.studentService.getAllStudents();
    const presenceList = students.map((student) => ({
      id: student.id,
      name: student.name,
      firstName: student.firstName,
      status: student.onLine ? 'online' : 'offline',
    }));
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

  @SubscribeMessage('join-channel')
  async joinChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { peerId: string; roomUuid: string },
  ) {
    client.join(data.roomUuid);
    console.log('data join channel : ', data);
    this.roomService.addUserOnRoom(data.peerId, data.roomUuid);
    this.server.to(data.roomUuid).emit('join-channel', {
      peerId: data.peerId,
    });
  }

  @SubscribeMessage('leave-channel')
  async leaveChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { peerId: string; roomUuid: string },
  ) {
    console.log('data leave : ', data);
    this.server.to(data.roomUuid).emit('leave-channel', {
      peerId: data.peerId,
    });

    client.leave(data.roomUuid);
    this.roomService.deletePeerIdUser(data);
  }

  // @SubscribeMessage('join-channel')
  // joinChannel(
  //   @MessageBody() data: { peerID: string },
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   console.log(`New user joined: PeerID ${data.peerID}`);
  //   const userUUID = this.roomService.addUser(data.peerID);
  //   client.join(this.roomService.channelUUID);
  //   this.socketToPeerMap.set(client.id, data.peerID);
  //   this.server.to(this.roomService.channelUUID).emit('user-joined', {
  //     peerID: data.peerID,
  //     uuid: userUUID,
  //     channelUUID: this.roomService.channelUUID,
  //     users: this.roomService.users,
  //   });
  //   return { uuid: userUUID, channelUUID: this.roomService.channelUUID };
  // }

  // @SubscribeMessage('leave-channel')
  // leaveChannel(
  //   @MessageBody() data: { peerID: string },
  //   @ConnectedSocket() client: Socket,
  // ) {
  //   console.log(`User left: PeerID ${data.peerID}`);
  //   const user = this.roomService.getUserByPeerID(data.peerID);
  //   if (user) {
  //     this.roomService.removeUser(data.peerID);
  //     client.leave(this.roomService.channelUUID);

  //     this.server.to(this.roomService.channelUUID).emit('user-disconnected', {
  //       peerID: data.peerID,
  //       uuid: user.uuid,
  //       users: this.roomService.users,
  //     });
  //     this.socketToPeerMap.delete(client.id);
  //   }
  // }

  // @SubscribeMessage('request-channel-info')
  // requestChannelInfo() {
  //   return {
  //     channelUUID: this.roomService.channelUUID,
  //     users: this.roomService.users,
  //   };
  // }

  // @SubscribeMessage('update-peer-id')
  // updatePeerID(@MessageBody() data: { oldPeerID: string; newPeerID: string }) {
  //   const user = this.roomService.getUserByPeerID(data.oldPeerID);
  //   if (user) {
  //     this.roomService.updateUserPeerID(user.uuid, data.newPeerID);
  //     this.server.to(this.roomService.channelUUID).emit('peer-id-updated', {
  //       oldPeerID: data.oldPeerID,
  //       newPeerID: data.newPeerID,
  //       uuid: user.uuid,
  //     });
  //   }
  // }
}
