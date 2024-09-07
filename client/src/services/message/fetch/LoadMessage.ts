import { IMessageGet } from '../../../../../common/interface/messageInterface';

// Load message with redis
export async function LoadMessage(): Promise<IMessageGet[]> {
  try {
    const response = await fetch('http://localhost:3000/room/1');

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} ${response.statusText} while fetching messages from ${response.url}`
      );
    }

    const payload: IMessageGet[] = await response.json();
    return payload;
  } catch (error) {
    console.error('Failed to load messages:', error);
    throw new Error('Failed to load messages. Please try again later.');
  }
}
