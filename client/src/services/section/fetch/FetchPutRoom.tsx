import { NavigationContextType } from '../../../context/NavigationContext';

//TODO Change PROMISE ANY
export async function fetchPutRoom(
  currentSection: NavigationContextType['currentSection'],
  data: string
): Promise<any> {
  const dataObj = {
    title: data,
  };
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}`;
    const response = await fetch(
      `${apiUrl}/section/${currentSection.sectionId}/topic/channel/${currentSection.channelId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} ${response.statusText} while editing section from ${response.url}`
      );
    }
    const payload = await response.json();
    return payload;
  } catch (error) {
    console.error('Failed to edit section:', error);
    throw new Error('Failed to edit section. Please try again later.');
  }
}
