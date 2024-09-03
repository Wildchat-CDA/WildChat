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

  public async updateMessage(
    roomId: string,
    index: number,
    newMessage: string,
  ): Promise<void> {
    // Récupère le message actuel à l'index donné pour ne pas perdre le nom
    const currentMessages = await this._client.lRange(`room:${roomId}`, 0, -1);
    if (index < 0 || index >= currentMessages.length) {
      throw new Error('Index out of range');
    }
    console.log('index : ', index);
    console.log('currentMessage : ', currentMessages[index]);
    // Récupère le message actuel pour ne pas perdre le nom
    const [currentName] = currentMessages[index].split(' : ');
    console.log('currentName  : ', currentName);

    // Crée le nouveau message avec le nom existant et le nouveau message
    const updatedMessage = `${currentName} : ${newMessage}`;

    // Met à jour le message à l'index spécifié
    await this._client.lSet(`room:${roomId}`, index, updatedMessage);
  }
}
