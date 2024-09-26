import { ISectionChannel } from '../../types/sectionTypes';

export async function loadPeerList(
  currentChannel: ISectionChannel | null
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
    console.log('Peer Id List fetch : ', payload);
    return payload;
  } catch (error) {
    console.error('Failed to load messages:', error);
    throw new Error('Failed to load messages. Please try again later.');
  }
}
