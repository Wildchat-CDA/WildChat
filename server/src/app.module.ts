import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './service/ChatGateway';
import { RedisService } from './service/redis.service';
import { RedisController } from './controller/redis.controller';

@Module({
  imports: [],
  controllers: [AppController, RedisController],
  providers: [AppService, ChatGateway, RedisService],
})
export class AppModule {}
