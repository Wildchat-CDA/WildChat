import { IMessageUpdatePayload } from "../../../../../common/interface/messageInterface";

export async function editMessage(
  messageUpdate: IMessageUpdatePayload
): Promise<void> {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}:${
      import.meta.env.VITE_API_PORT
    }`;
    const response = await fetch(
      `${apiUrl}/room/${messageUpdate.roomId}/message`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
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
    console.error("Failed to update message:", error);
    throw new Error("Failed to update the message. Please try again later.");
  }
}
