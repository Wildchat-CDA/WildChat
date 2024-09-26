import { IMessageDeletePayload } from "../../../../../common/interface/messageInterface";

export async function deleteMessage(
  data: IMessageDeletePayload
): Promise<void> {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}:${
      import.meta.env.VITE_API_PORT
    }`;
    const response = await fetch(
      `${apiUrl}/room/${data.roomId}/message/${data.index}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} ${response.statusText} while deleting message at index ${data.index} in room ${data.roomId}`
      );
    }
  } catch (error) {
    console.error("Failed to delete message:", error);
    throw new Error("Failed to delete the message. Please try again later.");
  }
}
