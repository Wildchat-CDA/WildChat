import axios from "axios";
import { StudentInvite } from "../../types/studentInviteType";

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const inviteStudents = async (students: StudentInvite[]) => {
  const tokenCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))

  if (!tokenCookie) {
    throw new Error("Token non trouvé");
  }

  const tokenObj = JSON.parse(decodeURIComponent(tokenCookie.split("=")[1]));
  const token = tokenObj.encoded;

  if (!token) {
    throw new Error("Token invalide");
  }

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };

  console.info("Détails de la requête : ", {
    url: `${API_URL}/invite`,
    method: "POST",
    data: students,
    headers: config.headers,
    token: token,
  });

  console.log("Données envoyées : ", JSON.stringify(students, null, 2));

  try {
    const response = await axios.post(
      `${API_URL}/invite`,
      students.map((student) => ({
        name: student.name,
        firstName: student.firstName,
        email: student.email,
      })),
      config
    );
    console.info("Réponse du serveur : ", response);
    
    return response.data;
  } catch (error: unknown) {
    console.error("Erreur lors de l'invitation des étudiants:", error);
    if (axios.isAxiosError(error)) {
      console.error("Erreur Axios:", {
        message: error.message,
        response: error.response?.data,
        config: error.config,
      });
      if (error.response) {
        console.error("Données envoyées : ", error.response.config.data);
        console.error("Réponse du serveur : ", error.response.data);
      }
    } else if (error instanceof Error) {
      console.error("Erreur:", error.message);
    } else {
      console.error("Erreur inconnue:", error);
    }
    throw error;
  }
};

export type { StudentInvite };