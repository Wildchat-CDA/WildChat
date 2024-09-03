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

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      // host: 'localhost',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      // port: 3306,
      // username: 'sdp',
      username: process.env.DB_USERNAME,
      // password: 'T9j83dmx?',
      password: process.env.DB_PASSWORD,
      // database: 'wildchat',
      database: process.env.DB_DATABASE,
      entities: [Role, User, Section, Channel, Type, Config],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
