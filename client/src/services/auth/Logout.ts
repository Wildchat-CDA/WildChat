export async function logout(id: number) {
  const apiURL = `${import.meta.env.VITE_API_URL}`;
  const url = `${apiURL}/logout`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    });
    if (!response.ok) {
      console.log('response : ', response);
      const errorText = await response.text();
      throw new Error(
        `Error: ${response.status} ${response.statusText}. ${errorText}`
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('An unknown error occurred while logout user.');
    }
  }
}
