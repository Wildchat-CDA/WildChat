export const fetchAvatar = async (userId: string): Promise<string | null> => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/avatar`);
      if (!response.ok) throw new Error('Failed to fetch avatar');
      const data: { avatarUrl: string | null } = await response.json();
      return data.avatarUrl;
    } catch (error) {
      console.error('Error fetching avatar:', error);
      return null;
    }
  };