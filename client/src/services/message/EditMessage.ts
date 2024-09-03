import { MessageUpdate } from '../../types/messageTypes';

export async function editMessage(messageUpdate: MessageUpdate): Promise<void> {
  const response = await fetch(
    `http://localhost:3000/room/${messageUpdate.roomId}/message`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messageUpdate,
      }),
    }
  );

  console.log('message updae :: ', messageUpdate);
}
