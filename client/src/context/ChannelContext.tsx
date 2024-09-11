import React, { createContext, useState, useContext, ReactNode } from 'react';

// Définition du type pour le contexte
interface ActiveChannelContextType {
  currentChannel: string | null;
  setCurrentChannel: React.Dispatch<React.SetStateAction<string | null>>;
}

// Création du contexte avec un type par défaut
const ActiveChannelContext = createContext<
  ActiveChannelContextType | undefined
>(undefined);

export function useActiveChannel() {
  const context = useContext(ActiveChannelContext);
  if (context === undefined) {
    throw new Error(
      'useActiveChannel must be used within an ActiveChannelProvider'
    );
  }
  return context;
}

interface ActiveChannelProviderProps {
  children: ReactNode;
}

export function ActiveChannelProvider({
  children,
}: ActiveChannelProviderProps) {
  const [currentChannel, setCurrentChannel] = useState<string | null>(null);
  const [currentSection, setCurrentSection] = useState<string | null>(null);

  const value = {
    currentChannel,
    setCurrentChannel,
    currentSection,
    setCurrentSection,
  };

  return (
    <ActiveChannelContext.Provider value={value}>
      {children}
    </ActiveChannelContext.Provider>
  );
}
