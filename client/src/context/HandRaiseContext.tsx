import React, { createContext, useContext, useState, ReactNode } from 'react';

type HandRaiseType = 'forSelf' | 'forTable';

interface RaisedHand {
  userId: string;
  userName: string;
  type: 'self' | 'table';
  timestamp: number;
  table: string;
}

interface HandRaiseContextType {
  raisedHands: RaisedHand[];
  userHandState: { forSelf: boolean; forTable: boolean };
  toggleHandRaise: (type: HandRaiseType) => void;
  userTable: string;
  updateUserTable: (newTable: string) => void;
}

const HandRaiseContext = createContext<HandRaiseContextType | undefined>(undefined);

export function useHandRaise() {
  const context = useContext(HandRaiseContext);
  if (context === undefined) {
    throw new Error('useHandRaise must be used within a HandRaiseProvider');
  }
  return context;
}

interface HandRaiseProviderProps {
  children: ReactNode;
}

export function HandRaiseProvider({ children }: HandRaiseProviderProps) {
  const [raisedHands, setRaisedHands] = useState<RaisedHand[]>([]);
  const [userHandState, setUserHandState] = useState({ forSelf: false, forTable: false });
  const [userTable, setUserTable] = useState('Table-1');

  function toggleHandRaise(type: HandRaiseType) {
    setUserHandState(function(prev) {
      const newState = { ...prev, [type]: !prev[type] };
      
      if (newState[type]) {
        setRaisedHands(function(hands) {
          return [
            ...hands,
            {
              userId: 'currentUser',
              userName: 'Utilisateur actuel',
              type: type === 'forSelf' ? 'self' : 'table',
              timestamp: Date.now(),
              table: userTable
            }
          ];
        });
      } else {
        setRaisedHands(function(hands) {
          return hands.filter(function(hand) {
            return !(hand.userId === 'currentUser' && hand.type === (type === 'forSelf' ? 'self' : 'table'));
          });
        });
      }

      return newState;
    });
  }

  function updateUserTable(newTable: string) {
    setUserTable(newTable);
  }

  const value = {
    raisedHands,
    userHandState,
    toggleHandRaise,
    userTable,
    updateUserTable
  };

  return (
    <HandRaiseContext.Provider value={value}>
      {children}
    </HandRaiseContext.Provider>
  );
}