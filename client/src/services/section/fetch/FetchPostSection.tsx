export async function fetchPostSection(data): Promise<any> {
  const dataObj = {
    title: data,
    order: 1,
  };
  try {
    const response = await fetch('http://localhost:3000/section/topic', {
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
