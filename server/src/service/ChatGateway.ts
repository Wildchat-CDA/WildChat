import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RedisService } from './redis.service';

interface Payload {
  name: string;
  message: string;
  roomId: number;
}

@WebSocketGateway({
  cors: true,
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly redisService: RedisService) {}

  afterInit() {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket): any {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: Payload) {
    console.log(data, 'Message received');
    this.redisService.client.lPush(
      `room:${data.roomId}`,
      `${data.name} : ${data.message}`,
    );
    this.server.emit('message', data);
  }
}
