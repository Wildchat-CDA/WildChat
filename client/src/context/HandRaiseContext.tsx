import React, { createContext, useState, useContext, useEffect } from 'react';
import webSocketService from '../services/webSocketService';

interface HandRaiseData {
  userId: string;
  userName: string;
  type: "self" | "table";
  table: string;
  timestamp: number;
}

interface HandRaiseContextType {
  raisedHands: HandRaiseData[];
  raiseHand: (userId: string, userName: string, type: "self" | "table", table: string) => void;
  lowerHand: (userId: string, type: "self" | "table") => void;
}

const HandRaiseContext = createContext<HandRaiseContextType | undefined>(undefined);

export const HandRaiseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [raisedHands, setRaisedHands] = useState<HandRaiseData[]>([]);

  useEffect(() => {
    const handleHandRaised = (data: Omit<HandRaiseData, 'timestamp'>) => {
      setRaisedHands(prev => [...prev, { ...data, timestamp: Date.now() }]);
    };

    const handleHandLowered = (data: { userId: string; type: "self" | "table" }) => {
      setRaisedHands(prev => prev.filter(hand => !(hand.userId === data.userId && hand.type === data.type)));
    };

    const handleRaisedHandsList = (data: Omit<HandRaiseData, 'timestamp'>[]) => {
      setRaisedHands(data.map(hand => ({ ...hand, timestamp: Date.now() })));
    };

    webSocketService.onHandRaised(handleHandRaised);
    webSocketService.onHandLowered(handleHandLowered);
    webSocketService.getRaisedHands(handleRaisedHandsList);

    return () => {
      webSocketService.off("hand_raised", handleHandRaised);
      webSocketService.off("hand_lowered", handleHandLowered);
      webSocketService.off("raised_hands_list", handleRaisedHandsList);
    };
  }, []);

  const raiseHand = (userId: string, userName: string, type: "self" | "table", table: string) => {
    webSocketService.raiseHand(userId, userName, type, table);
  };

  const lowerHand = (userId: string, type: "self" | "table") => {
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