import { NavigationContextType } from '../../../context/NavigationContext';

export async function fetchDeleteRoom(
  currentSection: NavigationContextType['currentSection']
): Promise<number> {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}:${
      import.meta.env.VITE_API_PORT
    }`;
    const response = await fetch(
      `${apiUrl}/channel/${currentSection.channelId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} ${response.statusText} while deleting a room from ${response.url}`
      );
    }

    return response.status;
  } catch (error) {
    console.error('Failed to delete room:', error);
    throw new Error('Failed to delete room. Please try again later.');
  }
}
