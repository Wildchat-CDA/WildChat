export async function fetchPostSection(
  data: string,
  isClassRoom: boolean
): Promise<any> {
  const dataObj = {
    title: data,
    isClassRoom: isClassRoom,
  };

  const urlApi = isClassRoom
    ? 'http://localhost:3000/section/'
    : 'http://localhost:3000/section/topic';
  try {
    const response = await fetch(urlApi, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataObj),
    });

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
