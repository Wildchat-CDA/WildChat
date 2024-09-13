import { IMessageUpdatePayload } from '../../../../../common/interface/messageInterface';

export async function editMessage(
  messageUpdate: IMessageUpdatePayload
): Promise<void> {
  try {
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

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} ${response.statusText} while updating message in room ${messageUpdate.roomId}`
      );
    }

  } catch (error) {
    console.error('Failed to update message:', error);
    throw new Error('Failed to update the message. Please try again later.');
  }
}
