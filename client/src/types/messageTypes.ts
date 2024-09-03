export interface Message {
  name: string;
  message: string;
  roomId: number;
}

export interface MessageUpdate {
  name: string;
  index: number;
  message: string;
  roomId: number;
}
