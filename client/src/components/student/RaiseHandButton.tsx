import React from 'react';
import useHandRaise from '../../hooks/useHandRaise';

interface RaiseHandButtonProps {
  studentId: number;
  studentName: string;
  table: string
}

function RaiseHandButton({ studentId, studentName, table }: RaiseHandButtonProps) {
  const { isHandRaised, raiseHand, lowerHand } = useHandRaise(studentId, studentName, table);

  const handleRaiseHandSelf = () => {
    if (isHandRaised.self) {
      lowerHand('self');
    } else {
      raiseHand('self');
    }
  };

  const handleRaiseHandTable = () => {
    if (isHandRaised.table) {
      lowerHand('table');
    } else {
      raiseHand('table');
    }
  };

  return (
    <div>
      <button onClick={handleRaiseHandSelf}>
        {isHandRaised.self ? 'Baisser la main pour soi' : 'Lever la main pour soi'}
      </button>
      <button onClick={handleRaiseHandTable}>
        {isHandRaised.table ? 'Baisser la main pour la table' : 'Lever la main pour la table'}
      </button>
    </div>
  );
}

export default RaiseHandButton;