import { NavigationContextType } from '../../../context/NavigationContext';
//TODO Change PROMISE ANY
export async function fetchPostRoom(
  currentSection: NavigationContextType['currentSection'],
  data: string,
  slotValue: number
): Promise<any> {
  const dataObj = {
    title: data,
    slot: slotValue,
  };
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;
    const response = await fetch(
      `${apiUrl}/section/${currentSection.sectionId}/topic/channel`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataObj),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} ${response.statusText} while creating new section from ${response.url}`
      );
    }
    const payload = await response.json();

    return payload;
  } catch (error) {
    console.error('Failed to create section:', error);
    throw new Error('Failed to create section. Please try again later.');
  }
}
