export interface Message {
  name: string;
  message: string;
  roomId: number;
}

export interface MessageUpdate {
  index: number;
  message: string;
  roomId: number;
}
