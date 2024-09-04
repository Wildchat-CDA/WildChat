import React, { useState } from 'react';

interface RaiseHandButtonProps {
  studentId: number;
  onRaiseHand: (studentId: number, type: 'self' | 'table') => void;
}

const RaiseHandButton = ({ studentId, onRaiseHand }: RaiseHandButtonProps) => {
  const [raisedForSelf, setRaisedForSelf] = useState(false);
  const [raisedForTable, setRaisedForTable] = useState(false);

  const handleRaiseHandSelf = () => {
    setRaisedForSelf(prev => !prev);
    onRaiseHand(studentId, 'self');
  };

  const handleRaiseHandTable = () => {
    setRaisedForTable(prev => !prev);
    onRaiseHand(studentId, 'table');
  };

  return (
    <div>
      <button onClick={handleRaiseHandSelf}>
        {raisedForSelf ? 'Baisser la main pour soi' : 'Lever la main pour soi'}
      </button>
      <button onClick={handleRaiseHandTable}>
        {raisedForTable ? 'Baisser la main pour la table' : 'Lever la main pour la table'}
      </button>
    </div>
  );
};

export default RaiseHandButton;
