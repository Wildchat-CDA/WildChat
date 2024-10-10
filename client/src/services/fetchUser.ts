import axios from 'axios';

interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export const fetchUser = async (userId: string): Promise<UserInfo> => {
  try {
    // TODO changer par un env
    const response = await axios.get(
      ` ${import.meta.env.VITE_API_URL}/user/${userId}`
    );
    return response.data;
  } catch (error) {
    throw new Error('User not Found');
    // return {
    //   id: userId,

    //    firstName: "Théo",
    //   lastName: "Doré",
    //   avatarUrl: "/path-to-default-avatar.png",
    // };
  }
};
