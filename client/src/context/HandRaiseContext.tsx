import React, { createContext, useState, useContext, useEffect } from 'react';
import webSocketService from '../services/webSocketService';

interface HandRaiseData {
  userId: number;
  userName: string;
  type: "self" | "table";
  table: string;
  timestamp: number;
}

interface HandRaiseContextType {
  raisedHands: HandRaiseData[];
  raiseHand: (userId: number, userName: string, type: "self" | "table", table: string) => void;
  lowerHand: (userId: number, type: "self" | "table") => void;
}

const HandRaiseContext = createContext<HandRaiseContextType | undefined>(undefined);

export const HandRaiseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [raisedHands, setRaisedHands] = useState<HandRaiseData[]>([]);

  useEffect(() => {
    const handleRaisedHandsUpdate = (data: HandRaiseData[]) => {
      setRaisedHands(data);
    };

   webSocketService.onRaisedHandsUpdate(handleRaisedHandsUpdate);

    return () => {
      webSocketService.off("raisedHandsUpdate", handleRaisedHandsUpdate);
    };
  }, []);

  const raiseHand = (userId: number, userName: string, type: "self" | "table", table: string) => {
    webSocketService.raiseHand(userId, userName, type, table);
  };

  const lowerHand = (userId: number, type: "self" | "table") => {
    webSocketService.lowerHand(userId, type);
  };

  return (
    <HandRaiseContext.Provider value={{ raisedHands, raiseHand, lowerHand }}>
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