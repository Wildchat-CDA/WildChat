import React, { createContext, useState, useContext } from 'react';

interface HandRaiseData {
  userId: number;
  userName: string;
  type: "self" | "table";
  table: string;
  timestamp: number;
}

interface HandRaiseContextType {
  raisedHands: HandRaiseData[];
  setRaisedHands: React.Dispatch<React.SetStateAction<HandRaiseData[]>>;
}

const HandRaiseContext = createContext<HandRaiseContextType | undefined>(undefined);

export const HandRaiseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [raisedHands, setRaisedHands] = useState<HandRaiseData[]>([]);

  return (
    <HandRaiseContext.Provider value={{ raisedHands, setRaisedHands }}>
      {children}
    </HandRaiseContext.Provider>
  );
};

export const useHandRaise = () => {
  const context = useContext(HandRaiseContext);
  if (context === undefined) {
    throw new Error('useHandRaise must be used within a HandRaiseProvider');
  }
  return context;
};