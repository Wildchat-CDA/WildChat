import { io, Socket } from "socket.io-client";

class WebSocketService {
  private socket: Socket;

  constructor() {
    // TODO changer l'url plus tard avec un env pour sécuriser
    this.socket = io("http://localhost:3000");
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
    userId: string,
    userName: string,
    type: "self" | "table",
    table: string
  ) {
    this.socket.emit("raiseHand", { userId, userName, type, table });
  }

  lowerHand(userId: string, type: "self" | "table") {
    this.socket.emit("lower_hand", { userId, type });
  }

  onHandRaised(
    callback: (data: {
      userId: string;
      userName: string;
      type: "self" | "table";
      table: string;
    }) => void
  ) {
    this.socket.on("hand_raised", callback);
  }

  onHandLowered(
    callback: (data: { userId: string; type: "self" | "table" }) => void
  ) {
    this.socket.on("hand_lowered", callback);
  }

  getRaisedHands(callback: (data: any[]) => void) {
    this.socket.emit("get_raised_hands");
    this.socket.on("raised_hands_list", callback);
  }
}

const webSocketService = new WebSocketService();
export default webSocketService;
