export interface IMessage {
  name: string;
  message: string;
  roomId: number;
}
export interface IMessageUpdateRedis {
  name: string;
  index: number;
  message: string;
  roomId: number;
}

export interface IModalMessagePayload {
  currentIndex: number | undefined;
  selectedRoomId: number | null;
  setMessages(newState: (prevState: IMessage[]) => IMessage[]): void;
  setActiveModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  currentMessage: string | undefined;
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
  roomId: number | null;
  index: number | undefined;
}
