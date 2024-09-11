import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'socket.io';
import { roomHandler } from './room/room';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const server = app.getHttpServer(); 
  const io = new Server(server, {
    cors: {
      origin: "*", 
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected');

    roomHandler(socket)
  
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });


  app.enableCors({
    // TODO changer l'url et dans le env
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  await app.listen(3000);
}

bootstrap();