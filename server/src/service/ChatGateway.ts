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
    if (client) {
      this.sendInitialPresenceList(client);
      //TODO Fonctionnalité en cours, commentaire normal
      // this.roomService.setClientToPeer(client);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`client ${client.id} disconnected`);
    //TODO Supprimer dans redis le peerId du client
    // Fonctionalité en cours, commentaire normal
    // this.roomService.deleteClientToPeer(client);
    const peerID = this.socketToPeerMap.get(client.id);
    if (peerID) {
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

  // Canal utilisé quand un utilisateur rejoint une room
  @SubscribeMessage('join-room')
  async joinChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { peerId: string; roomUuid: string; name: string },
  ) {
    try {
      client.join(data.roomUuid);

      this.roomService.addUserOnRoom(data, client);
      // Utilisé pour l'audio dans le composant AudioCall [FRONT]
      this.server.to(data.roomUuid).emit('join-room', {
        peerId: data.peerId,
        name: data.name,
        roomUuid: data.roomUuid,
      });

      // Utilisé pour l'affichage des users dans une room, composant UserIcons [FRONT]
      this.server.emit('join', {
        peerId: data.peerId,
        name: data.name,
        roomUuid: data.roomUuid,
      });
    } catch (err) {
      console.error(err);
    }
  }

  // Canal utilisé quand un utilisateur part d'une room
  @SubscribeMessage('leave-room')
  async leaveChannel(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { peerId: string; roomUuid: string; name: string },
  ) {
    try {
      // Utilisé pour l'audio dans le composant AudioCall [FRONT]
      this.server.to(data.roomUuid).emit('leave-room', {
        peerId: data.peerId,
        name: data.name,
        roomUuid: data.roomUuid,
      });
      // Utilisé pour l'affichage des users dans une room, composant UserIcons [FRONT]
      this.server.emit('leave', {
        peerId: data.peerId,
        name: data.name,
        roomUuid: data.roomUuid,
        client: client.id,
      });

      client.leave(data.roomUuid);
      const payload = { ...data, clientId: client.id };
      this.roomService.deletePeerIdUser(payload);
    } catch (err) {
      console.error(err);
    }
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
