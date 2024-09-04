export interface IMessage {
  name: string;
  message: string;
  roomId: number;
}
export interface IMessageUpdateRedis {
  name: string;
  index:number;
  message: string;
  roomId: number;
}

export interface IMessageUpdateProps {
  name: string;
  index: number;
  message: string;
  roomId: number;
  setActiveEdit(newState: boolean): void;
  setMessages(newState: (prevState: IMessage[]) => IMessage[]): void;
  updateMessage(msg: string, index: number): void;
}

export interface IMessageDelete {
  roomId: number;
  index: number;
}
