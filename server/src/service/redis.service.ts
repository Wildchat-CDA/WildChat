import {
  createClient,
  RedisClientType,
  RedisDefaultModules,
  RedisFunctions,
  RedisModules,
  RedisScripts,
} from 'redis';
import {
  Injectable,
  InternalServerErrorException,
  OnModuleInit,
} from '@nestjs/common';
import {
  IMessagePostPayload,
  IMessageDeletePayload,
  IMessageGet,
  IMessageUpdatePayload,
} from '../../../common/interface/messageInterface';

@Injectable()
export class RedisService implements OnModuleInit {
  private _client: RedisClientType<
    RedisDefaultModules & RedisModules,
    RedisFunctions,
    RedisScripts
  >;

  async onModuleInit() {
    try {
      this._client = await createClient().connect();
      console.log('Redis connection initialized');
    } catch (err) {
      console.error('Redis connection failed:', err);
      throw new InternalServerErrorException(
        'Failed to initialize Redis connection',
      );
    }
  }

  get client() {
    return this._client;
  }

  private checkConnection() {
    if (!this._client || !this._client.isReady) {
      throw new Error('Redis client is not ready');
    }
  }

  public async getMessages(roomId: string): Promise<IMessageGet[]> {
    this.checkConnection();
    try {
      const messages = await this._client.lRange(`room:${roomId}`, 0, -1);
      return messages.map((msg) => {
        const [name, message] = msg.split(' : ');
        return { name, message, roomId: roomId };
      });
    } catch (error) {
      console.error('Failed to get messages:', error);
      throw new InternalServerErrorException(
        'Failed to retrieve messages from Redis',
      );
    }
  }

  public async postMessage(data: IMessagePostPayload) {
    this.checkConnection();
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
    data: IMessageUpdatePayload,
    roomId: string,
  ): Promise<void> {
    this.checkConnection();
    console.log('Updating message:', { data, roomId });
    try {
      const key = `room:${roomId}`;
      console.log('Fetching current messages for key:', key);
      const currentMessages = await this._client.lRange(key, 0, -1);
      console.log('Current messages:', currentMessages);

      if (data.index < 0 || data.index >= currentMessages.length) {
        throw new Error('Index out of range');
      }
      if (data.message.length === 0) {
        throw new Error(
          'The message cannot be empty. Please enter some text before submitting.',
        );
      }

      const updatedMessage = `${data.name} : ${data.message}`;
      await this._client.lSet(key, data.index, updatedMessage);
      console.log('Message updated successfully');
    } catch (error) {
      console.error('Failed to update message:', error);
      throw new InternalServerErrorException(
        `Failed to update message in Redis: ${error.message}`,
      );
    }
  }

  public async deleteMessage(data: IMessageDeletePayload): Promise<void> {
    this.checkConnection();
    try {
      const currentMessages = await this._client.lRange(
        `room:${data.roomId}`,
        0,
        -1,
      );

      if (data.index < 0 || data.index >= currentMessages.length) {
        throw new Error('Index out of range');
      }

      const uniqueValue = '__DELETE__';
      await this._client.lSet(`room:${data.roomId}`, data.index, uniqueValue);
      await this._client.lRem(`room:${data.roomId}`, 1, uniqueValue);
    } catch (error) {
      console.error('Failed to delete message:', error);
      throw new InternalServerErrorException(
        'Failed to delete message from Redis',
      );
    }
  }

  public async raiseHand(data: {
    userId: number;
    userName: string;
    type: 'self' | 'table';
    table: string;
  }) {
    this.checkConnection();
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
    this.checkConnection();
    const key = `raisedHands:${data.type}`;
    await this._client.hDel(key, data.userId.toString());
  }

  public async getRaisedHands() {
    this.checkConnection();
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
