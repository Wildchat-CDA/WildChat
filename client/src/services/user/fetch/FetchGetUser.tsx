export async function fetchGetUser(): Promise<any> {
  try {
    const apiUrl = `${import.meta.env.VITE_API_URL}`;
    const response = await fetch(`${apiUrl}/user`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(
        `Error: ${response.status} ${response.statusText} while fetching users from ${response.url}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load users:', error);
    throw new Error('Failed to load users. Please try again later.');
  }
}
