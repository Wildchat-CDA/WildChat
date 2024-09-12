import { IMessageDeletePayload } from '../../../../../common/interface/messageInterface';

export async function deleteMessage(
  data: IMessageDeletePayload
): Promise<void> {
  try {
    const response = await fetch(
      `http://localhost:3000/room/${data.roomId}/message/${data.index}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} ${response.statusText} while deleting message at index ${data.index} in room ${data.roomId}`
      );
    }

    console.log('Message deletion successful:', data);
  } catch (error) {
    console.error('Failed to delete message:', error);
    throw new Error('Failed to delete the message. Please try again later.');
  }
}
