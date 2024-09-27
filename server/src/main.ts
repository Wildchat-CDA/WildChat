import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as https from 'https';

dotenv.config();

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
  };

  const app = await NestFactory.create(AppModule, {
    httpsOptions,
  });

  const allowedOrigins = [
    process.env.FRONTEND_URL + ':' + process.env.PORT_FRONT,
    process.env.LOCALTUNNEL_URL,
    /^https:\/\/.*\.loca\.lt$/,
  ];

  app.enableCors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  const server = https.createServer(
    httpsOptions,
    app.getHttpAdapter().getInstance(),
  );

  server.listen(3000, () => {
    console.log('Server is running on https://localhost:3000');
  });
}

bootstrap();
