import {
  createClient,
  RedisClientType,
  RedisDefaultModules,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from 'redis';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
      .on('error', (err) => {
        console.error('Redis connection error:', err);
        throw new InternalServerErrorException('Failed to connect to Redis');
      })
      .connect()
      .then((client) => {
        this._client = client;
        console.log('Redis connection initialized');
      })
      .catch((err) => {
        console.error('Redis connection failed:', err);
        throw new InternalServerErrorException(
          'Failed to initialize Redis connection',
        );
      });
  }

  get client() {
    return this._client;
  }

  public async getMessages(
    roomId: string,
  ): Promise<{ name: string; message: string; roomId: string }[]> {
    try {
      const messages = await this._client.lRange(`room:${roomId}`, 0, -1);

      return messages.map((msg) => {
        const [name, message] = msg.split(' : ');
        return { name, message, roomId };
      });
    } catch (error) {
      console.error('Failed to get messages:', error);
      throw new InternalServerErrorException(
        'Failed to retrieve messages from Redis',
      );
    }
  }

  public async postMessage(data: Payload) {
    if (data.message.length === 0) {
      throw new Error(
        'The message cannot be empty. Please enter some text before submitting.',
      );
    }
    try {
      await this.client.rPush(
        `room:${data.roomId}`,
        `${data.name} : ${data.message}`,
      );
    } catch (error) {
      console.error('Failed to post message:', error);
      throw new InternalServerErrorException('Failed to post message to Redis');
    }
  }

  public async updateMessage(
    name: string,
    index: number,
    newMessage: string,
    roomId: string,
  ): Promise<void> {
    try {
      const currentMessages = await this._client.lRange(
        `room:${roomId}`,
        0,
        -1,
      );

      if (index < 0 || index >= currentMessages.length) {
        throw new Error('Index out of range');
      }
      if (newMessage.length === 0) {
        throw new Error(
          'The message cannot be empty. Please enter some text before submitting.',
        );
      }

      const updatedMessage = `${name} : ${newMessage}`;
      await this._client.lSet(`room:${roomId}`, index, updatedMessage);
    } catch (error) {
      console.error('Failed to update message:', error);
      throw new InternalServerErrorException(
        'Failed to update message in Redis',
      );
    }
  }

  public async deleteMessage(roomId: string, index: number): Promise<void> {
    try {
      const currentMessages = await this._client.lRange(
        `room:${roomId}`,
        0,
        -1,
      );

      if (index < 0 || index >= currentMessages.length) {
        throw new Error('Index out of range');
      }

      // Replace the message to delete with a unique value
      const uniqueValue = '__DELETE__';
      await this._client.lSet(`room:${roomId}`, index, uniqueValue);

      // Remove the unique value from the list
      await this._client.lRem(`room:${roomId}`, 1, uniqueValue);
    } catch (error) {
      console.error('Failed to delete message:', error);
      throw new InternalServerErrorException(
        'Failed to delete message from Redis',
      );
    }
  }
}
