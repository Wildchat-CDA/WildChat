import { useState, useEffect } from "react";

export const useAvatar = (userId: string) => {
  const [avatarState, setAvatarState] = useState<{
    avatarUrl: string;
    firstName: string;
    lastName: string;
    isLoading: boolean;
    error: string | null;
  }>({
    avatarUrl: "/icons/avatar.png",
    firstName: "Théo",
    lastName: "Doré",
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const simulateFetchUser = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const userInfo = {
          avatarUrl: null,
          firstName: "Théo",
          lastName: "Doré",
        };

        if (isMounted) {
          setAvatarState({
            avatarUrl: userInfo.avatarUrl || "/icons/avatar.png",
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setAvatarState({
            avatarUrl: "/icons/avatar.png",
            firstName: "Théo",
            lastName: "Doré",
            isLoading: false,
            error: "Erreur lors du chargement de l'utilisateur",
          });
        }
      }
    };

    simulateFetchUser();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return avatarState;
};
