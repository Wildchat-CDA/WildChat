export interface Payload {
  name: string;
  message: string;
  roomId: number;
}

export interface MessageUpdateData {
  messageUpdate: {
    index: number;
    message: string;
    roomId: string;
  };
}
