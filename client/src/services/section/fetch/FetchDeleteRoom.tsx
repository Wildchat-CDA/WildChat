import { NavigationContextType } from '../../../context/NavigationContext';

export async function fetchDeleteRoom(
  currentSection: NavigationContextType['currentSection']
): Promise<number> {
  try {
    const response = await fetch(
      `http://localhost:3000/section/${currentSection.sectionId}/topic/channel/${currentSection.channelId}`,
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

    // Return the status code
    console.log(
      `Room ${currentSection.channelId} deleted successfully with status: ${response.status}`
    );
    return response.status;
  } catch (error) {
    console.error('Failed to delete room:', error);
    throw new Error('Failed to delete room. Please try again later.');
  }
}
