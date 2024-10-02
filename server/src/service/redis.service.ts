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
import { User } from 'src/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RedisService implements OnModuleInit {
  private _client: RedisClientType<
    RedisDefaultModules & RedisModules,
    RedisFunctions,
    RedisScripts
  >;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

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

  public async getAllUsers(): Promise<string[]> {
    try {
      const users = await this.usersRepository.find();
      return users.map((user) => user.id.toString());
    } catch (error) {
      console.error('Failed to get all users:', error);
      throw new InternalServerErrorException('Failed to get all users');
    }
  }

  public async getMessages(roomId: string): Promise<IMessageGet[]> {
    this.checkConnection();
    try {
      const messages = await this._client.lRange(`room:${roomId}`, 0, -1);
      return messages.map((msg) => JSON.parse(msg));
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
      const messageId = `msg:${Date.now()}`;
      const messageData = JSON.stringify({
        id: messageId,
        ...data,
        isImportant: data.message.startsWith('!!!'),
      });
      await this.client.rPush(`room:${data.roomId}`, messageData);

      if (data.message.startsWith('!!!')) {
        await this.client.sAdd(`room:${data.roomId}:important`, messageId);
        const allUsers = await this.getAllUsers();
        await this.client.sAdd(
          `room:${data.roomId}:${messageId}:unread`,
          allUsers,
        );
      }

      return messageId;
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
    try {
      const key = `room:${roomId}`;
      const messages = await this._client.lRange(key, 0, -1);

      if (data.index < 0 || data.index >= messages.length) {
        throw new Error('Index out of range');
      }
      if (data.message.length === 0) {
        throw new Error(
          'The message cannot be empty. Please enter some text before submitting.',
        );
      }

      const currentMessage = JSON.parse(messages[data.index]);
      const updatedMessage = {
        ...currentMessage,
        message: data.message,
        isImportant: data.message.startsWith('!!!'),
      };
      await this._client.lSet(key, data.index, JSON.stringify(updatedMessage));

      if (updatedMessage.isImportant) {
        await this._client.sAdd(`room:${roomId}:important`, updatedMessage.id);
        const allUsers = await this.getAllUsers();
        await this._client.sAdd(
          `room:${roomId}:${updatedMessage.id}:unread`,
          allUsers,
        );
      } else {
        await this._client.sRem(`room:${roomId}:important`, updatedMessage.id);
        await this._client.del(`room:${roomId}:${updatedMessage.id}:unread`);
      }
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
      const key = `room:${data.roomId}`;
      const messages = await this._client.lRange(key, 0, -1);

      if (data.index < 0 || data.index >= messages.length) {
        throw new Error('Index out of range');
      }

      const messageToDelete = JSON.parse(messages[data.index]);
      await this._client.lRem(key, 1, messages[data.index]);

      if (messageToDelete.isImportant) {
        await this._client.sRem(
          `room:${data.roomId}:important`,
          messageToDelete.id,
        );
        await this._client.del(
          `room:${data.roomId}:${messageToDelete.id}:unread`,
        );
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
      throw new InternalServerErrorException(
        'Failed to delete message from Redis',
      );
    }
  }

  public async markMessageAsImportant(
    roomId: string,
    messageId: string,
    teacherId: number,
  ) {
    this.checkConnection();
    try {
      const key = `room:${roomId}`;
      const messages = await this._client.lRange(key, 0, -1);
      const messageIndex = messages.findIndex(
        (msg) => JSON.parse(msg).id === messageId,
      );

      if (messageIndex === -1) {
        throw new Error('Message not found');
      }

      const message = JSON.parse(messages[messageIndex]);
      message.isImportant = true;
      await this._client.lSet(key, messageIndex, JSON.stringify(message));
      await this._client.sAdd(`room:${roomId}:important`, messageId);

      const allUsers = await this.getAllUsers();
      const unreadUsers = allUsers.filter(
        (userId) => userId !== teacherId.toString(),
      );
      await this._client.sAdd(
        `room:${roomId}:${messageId}:unread`,
        unreadUsers,
      );
    } catch (error) {
      console.error('Failed to mark message as important:', error);
      throw new InternalServerErrorException(
        'Failed to mark message as important in Redis',
      );
    }
  }

  public async markMessageAsRead(
    userId: number,
    messageId: string,
    roomId: string,
  ) {
    this.checkConnection();
    try {
      await this._client.sRem(
        `room:${roomId}:${messageId}:unread`,
        userId.toString(),
      );
    } catch (error) {
      console.error('Failed to mark message as read:', error);
      throw new InternalServerErrorException(
        'Failed to mark message as read in Redis',
      );
    }
  }

  public async getUnreadUsers(
    roomId: string,
    messageId: string,
  ): Promise<string[]> {
    this.checkConnection();
    try {
      return await this._client.sMembers(`room:${roomId}:${messageId}:unread`);
    } catch (error) {
      console.error('Failed to get unread users:', error);
      throw new InternalServerErrorException(
        'Failed to get unread users from Redis',
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

  public async setUserPresence(
    userId: string,
    status: 'online' | 'offline',
  ): Promise<void> {
    try {
      await this._client.set(`presence:${userId}`, status);
    } catch (error) {
      console.error('Failed to set user presence:', error);
      throw new InternalServerErrorException(
        'Failed to set user presence in Redis',
      );
    }
  }

  public async getUserPresence(userId: string): Promise<string> {
    try {
      const status = await this._client.get(`presence:${userId}`);
      return status || 'offline';
    } catch (error) {
      console.error('Failed to get user presence:', error);
      throw new InternalServerErrorException(
        'Failed to get user presence from Redis',
      );
    }
  }

  public async getAllUserPresences(): Promise<Record<string, string>> {
    try {
      const keys = await this._client.keys('presence:*');
      const presences = await Promise.all(
        keys.map(async (key) => {
          const userId = key.split(':')[1];
          const status = await this._client.get(key);
          return [userId, status];
        }),
      );
      return Object.fromEntries(presences);
    } catch (error) {
      console.error('Failed to get all user presences:', error);
      throw new InternalServerErrorException(
        'Failed to get all user presences from Redis',
      );
    }
  }
}
