import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { StudentService } from './student.service';
import { PresenceSimulatorService } from './presence-simulator.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  constructor(
    private readonly studentService: StudentService,
    private readonly presenceSimulatorService: PresenceSimulatorService,
  ) {
    console.log('ChatGateway: Initializing');
    this.presenceSimulatorService.onPresenceUpdate((updatedStudent) => {
      console.log(
        'ChatGateway: Received presence update, emitting to all clients:',
        updatedStudent,
      );
      this.server.emit('presenceUpdate', updatedStudent);
    });
  }

  handleConnection(client: Socket) {
    console.log(`ChatGateway: Client connected: ${client.id}`);
    this.sendInitialPresenceList(client);
  }

  handleDisconnect(client: Socket) {
    console.log(`ChatGateway: Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('getPresence')
  handleGetPresence(client: Socket) {
    console.log(
      `ChatGateway: Received getPresence request from client ${client.id}`,
    );
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
    console.log(
      `ChatGateway: Sending initial presence list to client ${client.id}:`,
      presenceList,
    );
    client.emit('initialPresence', presenceList);
  }
}
