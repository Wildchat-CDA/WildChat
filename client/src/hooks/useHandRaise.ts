import { useState, useEffect, useCallback } from "react";
import { useHandRaise as useHandRaiseContext } from "../context/HandRaiseContext";

const useHandRaise = (userId: number, userName: string, table: string) => {
  const { raisedHands, raiseHand, lowerHand } = useHandRaiseContext();
  const [isHandRaised, setIsHandRaised] = useState<{
    self: boolean;
    table: boolean;
  }>({ self: false, table: false });

  useEffect(() => {
    setIsHandRaised({
      self: raisedHands.some(
        (hand) => hand.userId === userId.toString() && hand.type === "self"
      ),
      table: raisedHands.some(
        (hand) => hand.userId === userId.toString() && hand.type === "table"
      ),
    });
  }, [raisedHands, userId]);

  const raiseHandCallback = useCallback(
    (type: "self" | "table") => {
      raiseHand(userId.toString(), userName, type, table);
    },
    [userId, userName, table, raiseHand]
  );

  const lowerHandCallback = useCallback(
    (type: "self" | "table") => {
      lowerHand(userId.toString(), type);
    },
    [userId, lowerHand]
  );

  return {
    raisedHands,
    isHandRaised,
    raiseHand: raiseHandCallback,
    lowerHand: lowerHandCallback,
  };
};

export default useHandRaise;
