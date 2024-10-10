import { PresenceData } from '../../types/presenceTypes';

const API_URL = `${import.meta.env.VITE_API_URL}:${
  import.meta.env.VITE_API_PORT
}`;

export const presenceService = {
  async getInitialPresence(): Promise<PresenceData[]> {
    try {
      const response = await fetch(`${API_URL}/presence`);
      if (!response.ok) {
        throw new Error('Failed to fetch presence data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching presence data:', error);
      throw error;
    }
  },
};
