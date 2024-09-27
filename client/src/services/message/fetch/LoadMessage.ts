import { IMessageGet } from "../../../../../common/interface/messageInterface";
import { ISectionChannel } from "../../../types/sectionTypes";

// Load message with redis
export async function LoadMessage(
  currentChannel: ISectionChannel | null
): Promise<IMessageGet[]> {
  try {
    // const apiUrl = `${import.meta.env.VITE_API_URL}`+ `:` + `${
    //   import.meta.env.VITE_API_PORT
    //   }`;
    const apiUrl = 'http://localhost:3000'
    console.log(apiUrl, "apiURL");
    console.log(currentChannel?.uuid,"currentChannel loadMessage")
    const response = await fetch(
      `${apiUrl}/room/${currentChannel ? currentChannel.uuid : ""}`
    );

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} ${response.statusText} while fetching messages from ${response.url}`
      );
    }

    const payload: IMessageGet[] = await response.json();
    return payload;
  } catch (error) {
    console.error("Failed to load messages:", error);
    throw new Error("Failed to load messages. Please try again later.");
  }
}
