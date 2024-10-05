import { IChannel } from '../../types/sectionTypes';
import { ISectionChannel } from '../../types/sectionTypes';

export async function loadPeerList(
  currentChannel: IChannel | ISectionChannel | null
): Promise<string[]> {
  try {
    const response = await fetch(
      `http://localhost:3000/room/peer/${
        currentChannel ? currentChannel.uuid : ''
      }`
    );

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} ${response.statusText} while fetching messages from ${response.url}`
      );
    }

    const payload: string[] = await response.json();
    return payload;
  } catch (error) {
    console.error('Failed to load messages:', error);
    throw new Error('Failed to load messages. Please try again later.');
  }
}
