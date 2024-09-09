import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PeerJSService } from './services/peerjs.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    // TODO changer l'url et mettre dans le .env
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const peerJSService = app.get(PeerJSService);
  peerJSService.setupPeerServer(app);

  await app.listen(process.env.PORT || 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
