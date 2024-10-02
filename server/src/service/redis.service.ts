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
import { IPeerIdOnRoomPayload } from '../../../common/interface/redisInterface';

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

  public async deletePeerIdUser(data: IPeerIdOnRoomPayload) {
    if (data.peerId === null || data.peerId.length === 0) {
      throw new Error('Le peerId ne peut pas être vide');
    }

    try {
      const peerData = `${data.peerId}:${data.name}`;
      const result = await this.client.lRem(
        `roomPeerId:${data.roomUuid}`,
        0,
        peerData,
      );

      if (result === 0) {
        console.warn(
          `Le peerId ${data.peerId} n'a pas été trouvé dans la room ${data.roomUuid}`,
        );
      } else {
        console.log(
          `Le peerId ${data.peerId} a été supprimé de la room ${data.roomUuid}`,
        );
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du peerId:', error);
      throw new InternalServerErrorException(
        'Erreur lors de la suppression du peerId de Redis',
      );
    }
  }

  public async getPeerId(roomId: string) {
    try {
      const peerList = await this._client.lRange(`roomPeerId:${roomId}`, 0, -1);
      return peerList;
    } catch (error) {
      console.error('Failed to get peerId list', error);
      throw new InternalServerErrorException(
        'Failed to retrieve Peer Id List from redis',
      );
    }
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
  public async postPeerIdOnRoom(data: IPeerIdOnRoomPayload) {
    if (data.peerId === null || data.peerId.length === 0) {
      throw new Error('The peerId cannot be empty');
    }

    try {
      // Vérifie si le peerId existe déjà dans une autre room
      const existingRoomUuid = await this.client.hGet(
        'roomPeerIdMapping',
        data.peerId,
      );

      if (existingRoomUuid) {
        // Supprime le peerId de l'ancienne room
        await this.client.lRem(
          `roomPeerId:${existingRoomUuid}`,
          0,
          data.peerId,
        );
      }

      // Ajoute le peerId dans la nouvelle room
      await this.client.rPush(
        `roomPeerId:${data.roomUuid}`,
        `${data.peerId}:${data.name}`,
      );

      // Met à jour la nouvelle roomUuid dans le mapping de peerId
      await this.client.hSet('roomPeerIdMapping', data.peerId, data.roomUuid);
    } catch (error) {
      console.error('Failed to post peerId:', error);
      throw new InternalServerErrorException('Failed to post peerId to Redis');
    }
  }

  // public async setUserOnRoom (data){

  public async updateMessage(
    data: IMessageUpdatePayload,
    roomId: string,
  ): Promise<void> {
    this.checkConnection();
    try {
      const key = `room:${roomId}`;
      const currentMessages = await this._client.lRange(key, 0, -1);

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
