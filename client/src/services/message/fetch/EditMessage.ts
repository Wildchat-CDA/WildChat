import { IMessageUpdatePayload } from "../../../../../common/interface/messageInterface";

export async function editMessage(
  messageUpdate: IMessageUpdatePayload
): Promise<void> {
  const apiUrl = `${import.meta.env.VITE_API_URL}:${
    import.meta.env.VITE_API_PORT
  }`;
  const url = `${apiUrl}/room/${messageUpdate.roomId}/message`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageUpdate),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Error: ${response.status} ${response.statusText}. ${errorText}`
      );
    }
  } catch (error) {
    console.error("Failed to update message:", error);
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("An unknown error occurred while updating the message.");
    }
  }
}
