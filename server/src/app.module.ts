import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './service/ChatGateway';
import { RedisService } from './service/redis.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ChatGateway, RedisService],
})
export class AppModule {}
