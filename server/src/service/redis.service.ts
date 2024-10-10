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
      this._client = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379',
      });

      this._client.on('error', (err) =>
        console.error('Redis Client Error', err),
      );
      this._client.on('connect', () => console.log('Redis Client Connected'));
      this._client.on('ready', () => console.log('Redis Client Ready'));

      await this._client.connect();
      console.log('Redis connection initialized');

      await this.testConnection();
    } catch (err) {
      console.error('Redis connection failed:', err);
      throw new InternalServerErrorException(
        'Failed to initialize Redis connection',
      );
    }
  }

  private async testConnection() {
    try {
      await this._client.set('test_key', 'test_value');
      const value = await this._client.get('test_key');
      console.log('Test key set and retrieved successfully:', value);

      const keys = await this._client.keys('*');
      console.log('All keys in Redis:', keys);
    } catch (error) {
      console.error('Test connection failed:', error);
    }
  }

  get client() {
    return this._client;
  }

  public async deleteClientToPeer(client) {
    try {
      // Vérifie si un peerId est associé à ce client
      const peerId = await this.client.hGet(`client:${client.id}`, 'peerId');

      if (peerId) {
        console.log(
          `Client ${client.id} est associé au peerId : ${peerId}. Suppression...`,
        );

        // Appelle la méthode pour supprimer le peerId associé au client
        const data = {
          peerId: peerId,
          roomUuid: null,
          name: null,
          client: null,
        };
        await this.deletePeerIdUser(data);

        // Supprime également le peerId du hSet client
        await this.client.hDel(`client:${client.id}`, 'peerId');

        console.log(
          `Le peerId ${peerId} a été supprimé pour le client ${client.id}.`,
        );
      } else {
        console.log(
          `Aucun peerId trouvé pour le client ${client.id}. Pas de suppression nécessaire.`,
        );
      }
    } catch (error) {
      console.error(
        'Erreur lors de la suppression du peerId pour le client:',
        error,
      );
      throw new InternalServerErrorException(
        'Failed to delete peerId for client.',
      );
    }
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
      console.log(`Retrieved ${messages.length} messages for room ${roomId}`);
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

  public async setClientToPeer(client) {
    console.log('client ID : ', client.id);
    await this.client.hSet(`client:${client.id}`, 'clientId', client.id);
  }

  public async affectedClientToPeer(data, client) {
    // Vérifie si le peerId est fourni
    if (!data.peerId || data.peerId.length === 0) {
      throw new Error('Le peerId ne peut pas être vide');
    }

    try {
      // Récupère l'ID de peer existant pour le client
      const existingPeerId = await this.client.hGet(
        `client:${client.id}`,
        'peerId',
      );

      if (existingPeerId) {
        console.log(
          `Client ${client.id} a déjà un peerId : ${existingPeerId}. Ne rien faire.`,
        );
        return; // Si le client a déjà un peerId, ne rien faire
      }

      // Affecte le peerId au client dans son hSet
      await this.client.hSet(`client:${client.id}`, 'peerId', data.peerId);
      console.log(`Affecté peerId ${data.peerId} au client ${client.id}.`);
    } catch (error) {
      console.error("Erreur lors de l'affectation du peerId au client:", error);
      throw new InternalServerErrorException(
        "Échec de l'affectation du peerId au client.",
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
      console.log(`Message posted to room ${data.roomId}`);
    } catch (error) {
      console.error('Failed to post message:', error);
      throw new InternalServerErrorException('Failed to post message to Redis');
    }
  }
  public async postPeerIdOnRoom(data: IPeerIdOnRoomPayload, client) {
    this.checkConnection();
    this.affectedClientToPeer(data, client);
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
      console.log(`Message updated in room ${roomId} at index ${data.index}`);
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
      console.log(
        `Message deleted from room ${data.roomId} at index ${data.index}`,
      );
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
    try {
      await this._client.hSet(
        key,
        data.userId.toString(),
        JSON.stringify({
          userName: data.userName,
          table: data.table,
          timestamp: Date.now(),
        }),
      );
      console.log(`Hand raised for user ${data.userId} (${data.type})`);
    } catch (error) {
      console.error('Failed to raise hand:', error);
      throw new InternalServerErrorException('Failed to raise hand in Redis');
    }
  }

  public async lowerHand(data: { userId: number; type: 'self' | 'table' }) {
    this.checkConnection();
    const key = `raisedHands:${data.type}`;
    try {
      await this._client.hDel(key, data.userId.toString());
      console.log(`Hand lowered for user ${data.userId} (${data.type})`);
    } catch (error) {
      console.error('Failed to lower hand:', error);
      throw new InternalServerErrorException('Failed to lower hand in Redis');
    }
  }

  public async getRaisedHands() {
    this.checkConnection();
    try {
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

      const result = [
        ...formatHands(selfHands, 'self'),
        ...formatHands(tableHands, 'table'),
      ];
      console.log(`Retrieved ${result.length} raised hands`);
      return result;
    } catch (error) {
      console.error('Failed to get raised hands:', error);
      throw new InternalServerErrorException(
        'Failed to get raised hands from Redis',
      );
    }
  }

  public async setUserPresence(
    userId: string,
    status: 'online' | 'offline',
  ): Promise<void> {
    this.checkConnection();
    try {
      await this._client.set(`presence:${userId}`, status);
      console.log(`User presence set for ${userId}: ${status}`);
    } catch (error) {
      console.error('Failed to set user presence:', error);
      throw new InternalServerErrorException(
        'Failed to set user presence in Redis',
      );
    }
  }

  public async getUserPresence(userId: string): Promise<string> {
    this.checkConnection();
    try {
      const status = await this._client.get(`presence:${userId}`);
      console.log(
        `Retrieved presence for user ${userId}: ${status || 'offline'}`,
      );
      return status || 'offline';
    } catch (error) {
      console.error('Failed to get user presence:', error);
      throw new InternalServerErrorException(
        'Failed to get user presence from Redis',
      );
    }
  }

  public async getAllUserPresences(): Promise<Record<string, string>> {
    this.checkConnection();
    try {
      const keys = await this._client.keys('presence:*');
      const presences = await Promise.all(
        keys.map(async (key) => {
          const userId = key.split(':')[1];
          const status = await this._client.get(key);
          return [userId, status];
        }),
      );
      const result = Object.fromEntries(presences);
      console.log(`Retrieved ${Object.keys(result).length} user presences`);
      return result;
    } catch (error) {
      console.error('Failed to get all user presences:', error);
      throw new InternalServerErrorException(
        'Failed to get all user presences from Redis',
      );
    }
  }

  public async setToken(
    token: string,
    userId: number,
    expirationTime: number,
  ): Promise<void> {
    this.checkConnection();
    try {
      console.log(
        `Attempting to set token: ${token} for user: ${userId} with expiration: ${expirationTime}`,
      );
      const result = await this._client.set(`magiclink:${token}`, userId, {
        EX: expirationTime,
      });
      console.log('Token set result:', result);

      const storedValue = await this._client.get(`magiclink:${token}`);
      console.log(
        `Immediate verification - Stored token value: ${storedValue}`,
      );

      const ttl = await this._client.ttl(`magiclink:${token}`);
      console.log(`Token TTL: ${ttl}`);

      const allKeys = await this._client.keys('magiclink:*');
      console.log('All magiclink keys after setting:', allKeys);
    } catch (error) {
      console.error('Failed to create token:', error);
      throw new InternalServerErrorException('Failed to store token in Redis');
    }
  }

  public async getToken(token: string): Promise<string | null> {
    this.checkConnection();
    try {
      console.log(`Attempting to retrieve token: ${token}`);
      const value = await this._client.get(`magiclink:${token}`);
      console.log('Retrieved token value:', value);
      return value;
    } catch (error) {
      console.error('Failed to retrieve token:', error);
      throw new InternalServerErrorException(
        'Failed to retrieve token from Redis',
      );
    }
  }

  public async deleteToken(token: string): Promise<void> {
    this.checkConnection();
    try {
      console.log(`Attempting to delete token: ${token}`);
      const result = await this._client.del(`magiclink:${token}`);
      console.log('Token deletion result:', result);
    } catch (error) {
      console.error('Failed to delete token:', error);
      throw new InternalServerErrorException(
        'Failed to delete token from Redis',
      );
    }
  }

  public async listMagicLinkTokens(): Promise<string[]> {
    this.checkConnection();
    try {
      const keys = await this._client.keys('magiclink:*');
      console.log('All magiclink tokens:', keys);
      return keys;
    } catch (error) {
      console.error('Failed to list magiclink tokens:', error);
      throw new InternalServerErrorException(
        'Failed to list magiclink tokens from Redis',
      );
    }
  }
}
