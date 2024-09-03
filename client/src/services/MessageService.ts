import { Message } from "../types/messageTypes";

export async function loadMessage(): Promise<Message[]> {
  const response = await fetch('http://localhost:3000/message');

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const payload: string[] = await response.json();

  // Retourner les messages transformés
  return payload
    .map((msg) => {
      const [name, message] = msg.split(' : ');
      return {
        name: name || 'Unknown',
        message: message || '',
        roomId: 0, // Assumer une valeur par défaut pour roomId si nécessaire
      };
    })
    .reverse();
}
