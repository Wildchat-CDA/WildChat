import { IMessagePostPayload } from '../../../common/interface/messageInterface';
import React from 'react';

export interface IModalMessagePayload {
  currentIndex: number | undefined;
  selectedRoomId: number | null;
  setMessages(
    newState: (prevState: IMessagePostPayload[]) => IMessagePostPayload[]
  ): void;
  setActiveModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
  currentMessage: string | undefined;
}

export interface IMessageUpdateProps {
  name: string;
  index: number;
  message: string;
  roomId: number;
  setActiveEdit(newState: boolean): void;
  setMessages(
    newState: (prevState: IMessagePostPayload[]) => IMessagePostPayload[]
  ): void;
  updateMessage(msg: string, index: number): void;
}

