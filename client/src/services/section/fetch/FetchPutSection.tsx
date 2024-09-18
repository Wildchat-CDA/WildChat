export async function fetchPutRoom(
  currentSection,
  data,
  slotValue
): Promise<any> {
  const dataObj = {
    title: data,
    slot: slotValue,
  };
  try {
    const response = await fetch(
      `http://localhost:3000/section/${currentSection.sectionId}/topic/channel`,
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
