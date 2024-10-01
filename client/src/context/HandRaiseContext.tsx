<<<<<<< HEAD
import { createContext, useState, useContext, useEffect } from 'react';
import { webSocketService } from '../services/webSocketService';
=======
import React, { createContext, useState, useContext, useEffect } from 'react';
import webSocketService from '../services/webSocketService';
>>>>>>> c14778c1838949fb784f3d0c0f7bd1b4369ec968

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
  isConnected: boolean;
}

const HandRaiseContext = createContext<HandRaiseContextType | undefined>(undefined);

export const HandRaiseProvider = ({ children }: { children: React.ReactNode }) => {
  const [raisedHands, setRaisedHands] = useState<HandRaiseData[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleRaisedHandsUpdate = (data: HandRaiseData[]) => {
      setRaisedHands(data);
    };

<<<<<<< HEAD
    webSocketService.connect();
    webSocketService.on("raisedHandsUpdate", handleRaisedHandsUpdate);

    const checkConnection = setInterval(() => {
      setIsConnected(webSocketService.isSocketConnected());
    }, 1000);
=======
   webSocketService.onRaisedHandsUpdate(handleRaisedHandsUpdate);
>>>>>>> c14778c1838949fb784f3d0c0f7bd1b4369ec968

    return () => {
      webSocketService.off("raisedHandsUpdate", handleRaisedHandsUpdate);
      clearInterval(checkConnection);
    };
  }, []);

  const raiseHand = (userId: number, userName: string, type: "self" | "table", table: string) => {
    if (isConnected) {
      webSocketService.emit("raiseHand", { userId, userName, type, table });
    } else {
      console.error('WebSocket is not connected. Cannot raise hand.');
    }
  };

  const lowerHand = (userId: number, type: "self" | "table") => {
    if (isConnected) {
      webSocketService.emit("lowerHand", { userId, type });
    } else {
      console.error('WebSocket is not connected. Cannot lower hand.');
    }
  };

  return (
    <HandRaiseContext.Provider value={{ raisedHands, raiseHand, lowerHand, isConnected }}>
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