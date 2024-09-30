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
    const apiUrl = `${import.meta.env.VITE_API_URL}:${
      import.meta.env.VITE_API_PORT
    }`;
    this.socket = io(apiUrl);
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


//a implementer par tout

// export class InstanceSocket {
//   private _webSocketService: WebSocketService;
//   static INSTANCE: InstanceSocket | null = null;

//   private constructor(){
//     this._webSocketService = new WebSocketService();
//   } 

//   get webSocketService(){
//     return this._webSocketService;
//   }

//   static getInstance(){
//     if(this.INSTANCE === null){
//       this.INSTANCE = new InstanceSocket();
//     } 
//     return this.INSTANCE;
//   }
// }


const webSocketService = new WebSocketService();
export default webSocketService;
