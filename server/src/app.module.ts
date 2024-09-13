import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entity/role.entity';
import { User } from './entity/user.entity';
import { Section } from './entity/section.entity';
import { Channel } from './entity/channel.entity';
import { Type } from './entity/type.entity';
import { Config } from './entity/config.entity';
import { ConfigModule } from '@nestjs/config';
import { SectionController } from './controller/section.controller';
import { ChannelController } from './controller/channel.controller';
import { SectionService } from './service/section.service';
import { ChannelService } from './service/channel.service';
import { TypeController } from './controller/type.controller';
import { TypeService } from './service/type.service';
import { ConfigController } from './controller/config.controller';
import { ConfigService } from './service/config.service';
import { ChatGateway } from './service/ChatGateway';
import { RedisService } from './service/redis.service';
import { RedisController } from './controller/redis.controller';
import { RaisedHandsController } from './controller/RaisedHands.controller';
import { HackmdModule } from './module/hack.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Role, User, Section, Channel, Type, Config],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Section, Channel, Type, Config]),
    HackmdModule,
  ],
  controllers: [
    AppController,
    RedisController,
    SectionController,
    ChannelController,
    TypeController,
    ConfigController,
    RedisController,
    RaisedHandsController,
  ],
  providers: [
    AppService,
    ChatGateway,
    RedisService,
    SectionService,
    ChannelService,
    TypeService,
    ConfigService,
    ChatGateway,
    RedisService,
  ],
})
export class AppModule {}
