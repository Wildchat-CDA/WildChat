import { useState, useEffect, useCallback } from "react";
import { useHandRaise as useHandRaiseContext } from "../context/HandRaiseContext";
import webSocketService from "../services/webSocketService";

interface HandRaiseData {
  userId: number;
  userName: string;
  type: "self" | "table";
  table: string;
  timestamp: number;
}

const useHandRaise = (userId: number, userName: string, table: string) => {
  const { raisedHands, setRaisedHands } = useHandRaiseContext();
  const [isHandRaised, setIsHandRaised] = useState<{
    self: boolean;
    table: boolean;
  }>({ self: false, table: false });

  useEffect(() => {
    const handleRaisedHandsUpdate = (updatedRaisedHands: HandRaiseData[]) => {
      setRaisedHands(updatedRaisedHands);
    };

    webSocketService.on("raisedHandsUpdate", handleRaisedHandsUpdate);
    return () => {
      webSocketService.off("raisedHandsUpdate", handleRaisedHandsUpdate);
    };
  }, [setRaisedHands]);

  useEffect(() => {
    setIsHandRaised({
      self: raisedHands.some(
        (hand) => hand.userId === userId && hand.type === "self"
      ),
      table: raisedHands.some(
        (hand) => hand.userId === userId && hand.type === "table"
      ),
    });
  }, [raisedHands, userId]);

  const raiseHand = useCallback(
    (type: "self" | "table") => {
      webSocketService.emit("raiseHand", { userId, userName, type, table });
    },
    [userId, userName, table]
  );

  const lowerHand = useCallback(
    (type: "self" | "table") => {
      webSocketService.emit("lowerHand", { userId, type });
    },
    [userId]
  );

  return { raisedHands, isHandRaised, raiseHand, lowerHand };
};

export default useHandRaise;
