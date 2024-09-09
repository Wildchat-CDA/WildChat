import { Injectable, OnModuleInit } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { ExpressPeerServer } from 'peer';
import * as express from 'express';

@Injectable()
export class PeerJSService implements OnModuleInit {
  private peerServer: any;

  onModuleInit() {
    // appelée une fois que le module sera initialisé
  }

  setupPeerServer(app: INestApplication) {
    const server = app.getHttpServer();
    this.peerServer = ExpressPeerServer(server, {
      path: '/myapp',
      allow_discovery: true,
    });

    this.peerServer.on('connection', (client) => {
      console.log('Client connected:', client.id);
    });

    this.peerServer.on('disconnect', (client) => {
      console.log('Client disconnected:', client.id);
    });

    const expressApp = express();
    expressApp.use('/peerjs', this.peerServer);
    app.use(expressApp);

    console.log('PeerJS server setup complete');
  }
}
