import { useState, useEffect, useCallback } from 'react';
import { webSocketService } from '../services/webSocketService';

interface HandRaiseData {
  userId: number;
  userName: string;
  type: 'self' | 'table';
  table: string;
  timestamp: number;
}

const useHandRaise = (userId: number, userName: string, table: string) => {
  const [raisedHands, setRaisedHands] = useState<HandRaiseData[]>([]);
  const [isHandRaised, setIsHandRaised] = useState({
    self: false,
    table: false,
  });

  const raiseHand = useCallback(
    (type: 'self' | 'table') => {
      webSocketService.emit('raiseHand', { userId, userName, type, table });
    },
    [userId, userName, table]
  );

  const lowerHand = useCallback(
    (type: 'self' | 'table') => {
      webSocketService.emit('lowerHand', { userId, type });
    },
    [userId]
  );

  useEffect(() => {
    const handleRaisedHandsUpdate = (data: HandRaiseData[]) => {
      setRaisedHands(data);
      const userHands = data.filter((hand) => hand.userId === userId);
      setIsHandRaised({
        self: userHands.some((hand) => hand.type === 'self'),
        table: userHands.some((hand) => hand.type === 'table'),
      });
    };

    webSocketService.connect();
    webSocketService.on('raisedHandsUpdate', handleRaisedHandsUpdate);
    webSocketService.emit('getRaisedHands');

    return () => {
      webSocketService.off('raisedHandsUpdate', handleRaisedHandsUpdate);
    };
  }, [userId]);

  return { raisedHands, isHandRaised, raiseHand, lowerHand };
};

export default useHandRaise;
