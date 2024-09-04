import { Message } from '../../types/messageTypes';

// Load message with redis
export async function LoadMessage(): Promise<Message[]> {
  const response = await fetch('http://localhost:3000/room/1');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const payload: Message[] = await response.json();

  return payload;
}

export const updateMessage = (msg, index, setState) => {
  setState((prevMessages) =>
    prevMessages.map((message, i) =>
      i === index ? { ...prevMessages, message: msg } : message
    )
  );
};
