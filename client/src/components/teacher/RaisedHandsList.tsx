import React from 'react';

interface RaisedHand {
  studentId: number;
  type: 'self' | 'table';
  raised: boolean;
}

interface RaisedHandsListProps {
  raisedHands: RaisedHand[];
}

const RaisedHandsList = ({ raisedHands }: RaisedHandsListProps) => {
  return (
    <div>
      {raisedHands.map((hand, index) => (
        <div key={index}>
          Élève {hand.studentId} a {hand.raised ? 'levé' : 'baissé'} la main pour {hand.type === 'self' ? 'soi' : 'la table'}
        </div>
      ))}
    </div>
  );
};

export default RaisedHandsList;
