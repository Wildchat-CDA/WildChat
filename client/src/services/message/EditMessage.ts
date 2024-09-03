import { Message } from '../../types/messageTypes';

export interface MessageUpdate {
  index: number;
  message: string;
  roomId: number;
}

export async function editMessage(messageUpdate: MessageUpdate): Promise<void> {
  const response = await fetch('http://localhost:3000/message/update', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messageUpdate,
    }),
  });

  console.log('message updae :: ', messageUpdate);
}
