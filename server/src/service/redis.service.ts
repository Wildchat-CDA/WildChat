import { Injectable } from '@nestjs/common';
import {
  createClient,
  RedisClientType,
  RedisDefaultModules,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from 'redis';
import { Payload } from 'src/types/payload.types';

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

  public async postMessage(data: Payload) {
    await this.client.rPush(
      `room:${data.roomId}`,
      `${data.name} : ${data.message}`,
    );
  }

  public async updateMessage(
    name: string,
    index: number,
    newMessage: string,
    roomId: string,
  ): Promise<void> {
    const currentMessages = await this._client.lRange(`room:${roomId}`, 0, -1);
    if (index < 0 || index >= currentMessages.length) {
      throw new Error('Index out of range');
    }

    const updatedMessage = `${name} : ${newMessage}`;
    await this._client.lSet(`room:${roomId}`, index, updatedMessage);
  }
  public async raiseHand(data: {
    userId: number;
    userName: string;
    type: 'self' | 'table';
    table: string;
  }) {
    const key = `raisedHands:${data.type}`;
    await this._client.hSet(
      key,
      data.userId.toString(),
      JSON.stringify({
        userName: data.userName,
        table: data.table,
        timestamp: Date.now(),
      }),
    );
  }

  public async lowerHand(data: { userId: number; type: 'self' | 'table' }) {
    const key = `raisedHands:${data.type}`;
    await this._client.hDel(key, data.userId.toString());
  }

  public async getRaisedHands() {
    const selfHands = await this._client.hGetAll('raisedHands:self');
    const tableHands = await this._client.hGetAll('raisedHands:table');

    const formatHands = (
      hands: Record<string, string>,
      type: 'self' | 'table',
    ) =>
      Object.entries(hands).map(([userId, data]) => ({
        userId: parseInt(userId),
        type,
        ...JSON.parse(data),
      }));

    return [
      ...formatHands(selfHands, 'self'),
      ...formatHands(tableHands, 'table'),
    ];
  }
}
