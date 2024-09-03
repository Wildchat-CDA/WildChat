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
}
