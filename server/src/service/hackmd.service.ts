import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HackmdService {
  private readonly apiUrl = 'https://api.hackmd.io/v1';

  async getNoteContent(noteId: string): Promise<string> {
    try {
      const response = await axios.get(`${this.apiUrl}/notes/${noteId}`);
      return response.data.content;
    } catch (error) {
      console.error('Erreur lors de la récupération du contenu HackMD:', error);
      throw new Error('Impossible de récupérer le contenu de la note HackMD');
    }
  }
}
