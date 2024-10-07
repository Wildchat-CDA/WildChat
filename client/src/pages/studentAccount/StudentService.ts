// import axios from "axios";
// import { StudentInvite } from "../../types/studentInviteType";

// const API_URL = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;
// interface InvitationResponse {
//     message: string;
//     invitations: {
//         name: string;
//         firstName: string;
//         email: string;
//         magicLink: string;
//     }[];
// }

// export const inviteStudents = async (students: StudentInvite[]): Promise<InvitationResponse> => {
//   const token = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("token="))
//     ?.split("=")[1];

//   if (!token) {
//     throw new Error("Token non trouvé");
//   }

//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//   };

//   try {
//     const response = await axios.post<InvitationResponse>(
//       `${API_URL}/invite`,
//       students,
//       config
//     );
//     return response.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       console.error("Erreur Axios:", {
//         message: error.message,
//         response: error.response?.data,
//         config: error.config,
//       });
//       throw new Error(error.response?.data?.message || "Une erreur est survenue lors de l'invitation des étudiants");
//     } else if (error instanceof Error) {
//       console.error("Erreur:", error.message);
//       throw error;
//     } else {
//       console.error("Erreur inconnue:", error);
//       throw new Error("Une erreur inconnue est survenue");
//     }
//   }
// };

import axios from "axios";
import { StudentInvite } from "../../types/studentInviteType";

const API_URL = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;

interface InvitationResponse {
  message: string;
  invitations: {
    name: string;
    firstName: string;
    email: string;
    magicLink: string;
  }[];
}

export const inviteStudents = async (students: StudentInvite[]): Promise<InvitationResponse> => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  if (!token) {
    throw new Error("Token non trouvé");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.post<InvitationResponse>(
      `${API_URL}/invite`,
      students,
      config
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erreur Axios:", {
        message: error.message,
        response: error.response?.data,
        config: error.config,
      });
      throw new Error(error.response?.data?.message || "Une erreur est survenue lors de l'invitation des étudiants");
    } else if (error instanceof Error) {
      console.error("Erreur:", error.message);
      throw error;
    } else {
      console.error("Erreur inconnue:", error);
      throw new Error("Une erreur inconnue est survenue");
    }
  }
};
