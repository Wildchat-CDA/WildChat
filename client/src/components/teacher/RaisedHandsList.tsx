import React from 'react';
import { useHandRaise } from '../../context/HandRaiseContext';
import './RaisedHandsList.css';

function RaisedHandsList() {
  const { raisedHands } = useHandRaise();
  
  function formatTime(timestamp: number): string {
    const now = Date.now();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) {
      return "Il y a moins d'une minute";
    } else if (diffInMinutes === 1) {
      return "Il y a 1 minute";
    } else {
      return `Il y a ${diffInMinutes} minutes`;
    }
  }

  return (
    <div className="raised-hands-list">
      <h1>Mains levées</h1>
      
      <section className="legend-section">
        <h2>Légende</h2>
        <div className="legend">
          <div className="legend-item">
            <img src="/icons/graduate-hat.png" alt="Pour soi" className="icon" />
            <span>Pour soi</span>
          </div>
          <div className="legend-item">
            <img src="/icons/multiple-users-silhouette.png" alt="Pour la table" className="icon" />
            <span>Pour la table</span>
          </div>
        </div>
      </section>

      <section className="list-section">
        <h2>Liste des mains levées</h2>
        <ul className="hands-list">
          {raisedHands.map((hand) => (
            <li key={`${hand.userId}-${hand.type}`} className="hand-item">
              <div className="hand-info-container">
                <img 
                  src={`/icons/${hand.type === 'self' ? 'graduate-hat.png' : 'multiple-users-silhouette.png'}`} 
                  alt={hand.type === 'self' ? "Pour soi" : "Pour la table"} 
                  className="icon"
                />
                <div className="hand-info">
                  <span className="user-name">{hand.userName}</span>
                  <span className="table-info">Table {hand.table}</span>
                </div>
              </div>
              <span className="time">{formatTime(hand.timestamp)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default RaisedHandsList;