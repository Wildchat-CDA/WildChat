import { IImportantMessageUpdate } from "../../../../../common/interface/messageInterface";

export async function markMessageAsImportant(
  roomId: string,
  messageId: string,
  userId: number
): Promise<IImportantMessageUpdate> {
  const apiUrl = `${import.meta.env.VITE_API_URL}:${
    import.meta.env.VITE_API_PORT
  }`;
  const url = `${apiUrl}/room/${roomId}/message/${messageId}/important`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Failed to mark message as important:", error);
    throw error;
  }
}
