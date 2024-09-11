import { io, Socket } from "socket.io-client";

class WebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io("http://localhost:3000"); // Assurez-vous que l'URL est correcte
  }

  on(event: string, callback: (data: any) => void) {
    this.socket.on(event, callback);
  }

  off(event: string, callback: (data: any) => void) {
    this.socket.off(event, callback);
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
