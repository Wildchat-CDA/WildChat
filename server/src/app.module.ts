import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ChannelController } from './controller/channel.controller';
import { ConfigController } from './controller/config.controller';
import { RaisedHandsController } from './controller/RaisedHands.controller';
import { RedisController } from './controller/redis.controller';
import { RoomController } from './controller/room.controller';
import { SectionController } from './controller/section.controller';
import { StudentController } from './controller/student.controller';
import { TypeController } from './controller/type.controller';
import { Channel } from './entity/channel.entity';
import { Config } from './entity/config.entity';
import { Role } from './entity/role.entity';
import { Section } from './entity/section.entity';
import { Type } from './entity/type.entity';
import { User } from './entity/user.entity';
import { ChannelService } from './service/channel.service';
import { ChatGateway } from './service/ChatGateway';
import { ConfigService } from './service/config.service';
import { PresenceService } from './service/presence.service';
import { PresenceSimulatorService } from './service/presence-simulator.service';
import { RedisService } from './service/redis.service';
import { RoomService } from './service/room.service';
import { SectionService } from './service/section.service';
import { StudentService } from './service/student.service';
import { TypeService } from './service/type.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
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
    AuthModule,
  ],
  controllers: [
    AppController,
    ChannelController,
    ConfigController,
    RaisedHandsController,
    RedisController,
    RoomController,
    SectionController,
    TypeController,
    StudentController,
  ],
  providers: [
    AppService,
    ChannelService,
    ChatGateway,
    ConfigService,
    RedisService,
    RoomService,
    SectionService,
    TypeService,
    PresenceService,
    StudentService,
    PresenceSimulatorService,
  ],
})
export class AppModule {}