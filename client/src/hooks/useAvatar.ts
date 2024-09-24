import { useState, useEffect } from "react";
import { fetchUser } from "../services/fetchUser";

export const useAvatar = (userId: string) => {
  const [avatarState, setAvatarState] = useState<{
    avatarUrl: string;
    firstName: string;
    lastName: string;
    isLoading: boolean;
    error: string | null;
  }>({
    avatarUrl: "/icons/avatar.png",
    firstName: "",
    lastName: "",
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const getUserInfo = async () => {
      try {
        const userInfo = await fetchUser(userId);
        if (isMounted) {
          setAvatarState({
            avatarUrl: userInfo.avatarUrl,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setAvatarState({
            avatarUrl: "/path-to-default-avatar.png",
            firstName: "Théo",
            lastName: "Doré",
            isLoading: false,
            error: "Error loading user info",
          });
        }
      }
    };

    getUserInfo();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  return avatarState;
};
