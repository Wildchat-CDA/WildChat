import axios from "axios";
import { StudentInvite } from "../../types/studentInviteType";

const API_URL = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;

export const inviteStudents = async (students: StudentInvite[]) => {
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

  console.log("Détails de la requête :", {
    url: `${API_URL}/invite`,
    method: "POST",
    data: students,
    headers: config.headers,
    token: token,
  });

  console.log("Données envoyées :", JSON.stringify(students, null, 2));

  try {
    const results = await Promise.all(
      students.map((student) =>
        axios.post(
          `${API_URL}/invite`,
          {
            name: student.name,
            firstName: student.firstName,
            email: student.email,
          },
          config
        )
      )
    );
    console.log("Réponses du serveur :", results.map((r) => r.data));
    return results.map((r) => r.data);
  } catch (error: unknown) {
    console.error("Erreur lors de l'invitation des étudiants:", error);
    if (axios.isAxiosError(error)) {
      console.error("Erreur Axios:", {
        message: error.message,
        response: error.response?.data,
        config: error.config,
      });
    } else if (error instanceof Error) {
      console.error("Erreur:", error.message);
    } else {
      console.error("Erreur inconnue:", error);
    }
    throw error;
  }
};
