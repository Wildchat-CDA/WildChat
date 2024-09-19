import { useState, useEffect } from 'react';
import { fetchAvatar } from '../services/fetchAvatar';

export const useAvatar = (userId: string) => {
  const [avatarState, setAvatarState] = useState<{
    avatarUrl: string | null;
    isLoading: boolean;
    error: string | null;
  }>({
    avatarUrl: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const getAvatar = async () => {
      try {
        const url = await fetchAvatar(userId);
        if (isMounted) {
          setAvatarState({ avatarUrl: url, isLoading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setAvatarState({ avatarUrl: null, isLoading: false, error: 'Error loading avatar' });
        }
      }
    };

    getAvatar();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return avatarState;
};
