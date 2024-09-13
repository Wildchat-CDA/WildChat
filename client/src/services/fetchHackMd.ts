import axios from "axios";

const extractNoteId = (url: string): string | null => {
  const regex = /https:\/\/hackmd\.io\/@[\w-]+\/([\w-]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

export const fetchHackMd = async (shareUrl: string) => {
  const noteId = extractNoteId(shareUrl);
  if (!noteId) {
    throw new Error("Invalid HackMD share URL");
  }

  const apiUrl = `http://localhost:3000/api/hackmd/notes/${noteId}`;

  try {
    const response = await axios.get(apiUrl, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération du contenu HackMD :", error);
    throw error;
  }
};
