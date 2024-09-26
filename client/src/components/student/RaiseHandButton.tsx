import { useState } from 'react';
import useHandRaise from '../../hooks/useHandRaise';

interface RaiseHandButtonProps {
  studentId: number;
  studentName: string;
  table: string
}

function RaiseHandButton({ studentId, studentName, table }: RaiseHandButtonProps) {
  const { isHandRaised, raiseHand, lowerHand } = useHandRaise(studentId, studentName, table);
  const [raisedForSelf, setRaisedForSelf] = useState(isHandRaised.self);
  const [raisedForTable, setRaisedForTable] = useState(isHandRaised.table);

  const handleRaiseHandSelf = () => {
    const newState = !raisedForSelf;
    setRaisedForSelf(newState);
    if (newState) {
      raiseHand('self');
    } else {
      lowerHand('self');
    }
  };

  const handleRaiseHandTable = () => {
    const newState = !raisedForTable;
    setRaisedForTable(newState);
    if (newState) {
      raiseHand('table');
    } else {
      lowerHand('table');
    }
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
}

export default RaiseHandButton;