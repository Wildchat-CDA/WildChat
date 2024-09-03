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
    TypeOrmModule.forFeature([Section, Channel]),
  ],
  controllers: [AppController, SectionController, ChannelController],
  providers: [AppService, SectionService, ChannelService],
})
export class AppModule {}
