import { io, Socket } from 'socket.io-client';

class WebSocketService {
  private static instance: WebSocketService | null = null;
  private socket: Socket | null = null;
  private isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isConnected) {
        resolve();
        return;
      }

      const apiUrl = `${import.meta.env.VITE_API_URL}:${
        import.meta.env.VITE_API_PORT
      }`;
      this.socket = io(apiUrl, {
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        timeout: 20000,
      });

      this.socket.on('connect', () => {
        this.isConnected = true;
        resolve();
      });

      this.socket.on('disconnect', (reason) => {
        this.isConnected = false;
      });

      this.socket.on('connect_error', (error) => {
        reject(error);
      });
    });
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  public on(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on(event, callback);
    }
  }

  public off(event: string, callback: (data: any) => void) {
    if (this.socket) {
      this.socket.off(event, callback);
    }
  }

  public emit(event: string, data?: any, callback?: (response: any) => void) {
    if (this.socket && this.isConnected) {
      if (callback) {
        this.socket.emit(event, data, callback);
      } else if (data !== undefined) {
        this.socket.emit(event, data);
      } else {
        this.socket.emit(event);
      }
    }
  }

  public isSocketConnected(): boolean {
    return this.isConnected;
  }
}

const webSocketService = WebSocketService.getInstance();
export { webSocketService };
