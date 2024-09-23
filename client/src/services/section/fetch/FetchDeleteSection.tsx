export async function fetchDeleteSection(id: number | null): Promise<number> {
  try {
    const response = await fetch(`http://localhost:3000/section/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} ${response.statusText} while deleting a section from ${response.url}`
      );
    }

    // Return the status code
    console.log(
      `Section ${id} deleted successfully with status: ${response.status}`
    );
    return response.status;
  } catch (error) {
    console.error('Failed to delete section:', error);
    throw new Error('Failed to delete section. Please try again later.');
  }
}
