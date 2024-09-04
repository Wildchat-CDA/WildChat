import { IMessage } from '../../types/messageTypes';

// Load message with redis
export async function LoadMessage(): Promise<IMessage[]> {
  try {
    const response = await fetch('http://localhost:3000/room/1');

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} ${response.statusText} while fetching messages from ${response.url}`
      );
    }

    const payload: IMessage[] = await response.json();
    return payload;
  } catch (error) {
    console.error('Failed to load messages:', error);
    throw new Error('Failed to load messages. Please try again later.');
  }
}

export const updateMessage = (msg, index, setState) => {
  setState((prevMessages) =>
    prevMessages.map((message, i) =>
      i === index ? { ...prevMessages, message: msg } : message
    )
  );
};
