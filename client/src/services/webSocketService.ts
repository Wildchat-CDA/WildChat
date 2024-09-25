import { io, Socket } from "socket.io-client";

interface HandRaiseData {
  userId: number;
  userName: string;
  type: "self" | "table";
  table: string;
  timestamp: number;
}

class WebSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io("http://localhost:3000");
    console.log("JE START SOCKET CONNEXION");
    
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

  raiseHand(
    userId: number,
    userName: string,
    type: "self" | "table",
    table: string
  ) {
    this.socket.emit("raiseHand", { userId, userName, type, table });
  }

  lowerHand(userId: number, type: "self" | "table") {
    this.socket.emit("lowerHand", { userId, type });
  }

  onRaisedHandsUpdate(callback: (data: HandRaiseData[]) => void) {
    this.socket.on("raisedHandsUpdate", callback);
  }
}

// class Instance {
//   static INSTANCE: Instance | null = null;

//   private _webSocket: WebSocketService;

//   private constructor() {
//     this._webSocket = new WebSocketService()
//   }

//   static getINSTANCE() {
//     if (Instance.INSTANCE == null) {
//       Instance.INSTANCE = new Instance();
//     }
//     return this.INSTANCE;
//   }

//   get webSocket() {
//     return this._webSocket;
//   }
// }

const webSocketService = new WebSocketService();
export default webSocketService;
