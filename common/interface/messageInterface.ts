export interface IMessagePostPayload {
  name: string;
  message: string;
  roomId: string;
}

export interface IMessageGet extends IMessagePostPayload {
  id: string;
  unreadUsers?: string[];
}

export interface IMessageUpdatePayload extends IMessagePostPayload {
  index: number;
}

export interface IMessageDeletePayload {
  roomId: string;
  index: number | null;
}

export interface IImportantMessageUpdate {
  messageId: string;
  unreadUsers: string[];
}
