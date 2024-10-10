import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { AuthModule } from './auth/auth.module';
import { ChannelController } from './controller/channel.controller';
import { ConfigController } from './controller/config.controller';
import { RaisedHandsController } from './controller/RaisedHands.controller';
import { RedisController } from './controller/redis.controller';
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
import { RedisService } from './service/redis.service';
import { RoomService } from './service/room.service';
import { SectionService } from './service/section.service';
import { StudentService } from './service/student.service';
import { TypeService } from './service/type.service';
import { EmailService } from './service/email.service';
import { TestEmailController } from './controller/test-email.controller';
import { PresenceController } from './controller/presence.controller';

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
    TypeOrmModule.forFeature([Section, Channel, Type, Config, User]),
    AuthModule,
  ],
  controllers: [
    AppController,
    ChannelController,
    ConfigController,
    RaisedHandsController,
    RedisController,
    // RoomController,
    UserController,
    SectionController,
    TypeController,
    StudentController,
    TestEmailController,
    PresenceController,
  ],
  providers: [
    AppService,
    ChannelService,
    ChatGateway,
    ConfigService,
    RedisService,
    RoomService,
    UserService,
    SectionService,
    TypeService,
    PresenceService,
    StudentService,
    EmailService,
  ],
})
export class AppModule {}
