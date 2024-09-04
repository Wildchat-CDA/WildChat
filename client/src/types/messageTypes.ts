export interface Message {
  name: string;
  message: string;
  roomId: number;
}

export interface MessageUpdatePaylod {
  name: string;
  index: number;
  message: string;
  roomId: number;
  setActiveEdit(newState: boolean): void;
  setMessages(newState: (prevState: Message[]) => Message[]): void;
  updateMessage(msg: string, index: number): void;
}
