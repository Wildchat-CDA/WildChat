import React, { createContext, useState, useContext, ReactNode } from 'react';

export enum ModalTypeEnum {
  DeleteMessage = 'deleteMessage',
  NewSection = 'newSection',
  NewRoom = 'newRoom',
}

type ModalType = ModalTypeEnum | null;

export interface ModalContextType {
  activeModal: ModalType;
  setActiveModal: (modalId: ModalType) => void;
}

// Création du contexte avec un type par défaut
const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [activeModal, setActiveModal] = useState<ModalType | null>(null);

  return (
    <ModalContext.Provider value={{ activeModal, setActiveModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};
