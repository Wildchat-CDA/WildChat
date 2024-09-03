import {
  createClient,
  RedisClientType,
  RedisDefaultModules,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from 'redis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisService {
  private _client: RedisClientType<
    RedisDefaultModules & RedisModules,
    RedisFunctions,
    RedisScripts
  >;

  constructor() {
    createClient()
      .on('error', console.error)
      .connect()
      .then((client) => {
        this._client = client;
        console.log('Redis connection initialized');
      });
  }

  get client() {
    return this._client;
  }

  public async getMessages(
    roomId: string,
  ): Promise<{ name: string; message: string; roomId: string }[]> {
    const messages = await this._client.lRange(`room:${roomId}`, 0, -1);

    return messages.map((msg) => {
      const [name, message] = msg.split(' : ');
      return { name, message, roomId };
    });
  }
}
