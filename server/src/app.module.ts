import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketGateway } from './gateways/websocket.gateway';
import { PeerJSService } from './services/peerjs.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, WebsocketGateway, PeerJSService],
})
export class AppModule {}
