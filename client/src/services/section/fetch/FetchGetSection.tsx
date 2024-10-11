//TODO CHANGE promise any

export async function fetchGetSection(type: string): Promise<any> {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}`;
    const response = await fetch(`${apiUrl}/section/${type}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} ${response.statusText} while fetching room's from ${response.url}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load room:', error);
    throw new Error('Failed to load room. Please try again later.');
  }
}
