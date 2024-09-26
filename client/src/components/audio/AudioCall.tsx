import { useEffect, useRef, useState } from 'react';
import PeerService from '../../services/peerJS/peerService';
import socket from '../../services/webSocketService';

const peerService = new PeerService();

export function AudioCall({ currentSection }) {
  const localAudioRef = useRef<HTMLAudioElement | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const [peerList, setPeerList] = useState<string[]>([]);
  const calledPeersRef = useRef<string[]>([]); // Utiliser useRef pour suivre les pairs appelés
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const initializeCall = async () => {
      await peerService.initializeAudioCall(
        currentSection,
        streamRef,
        localAudioRef,
        remoteAudioRef,
        socket,
        setPeerList
      );
    };

    initializeCall();
  }, [currentSection]); // Assurez-vous que cela s'exécute lorsque currentSection change

  useEffect(() => {
    if (peerList.length > 0) {
      console.log('Current Peer List:', peerList); // Vérifiez que peerList contient des valeurs
      peerList.forEach((remotePeerID) => {
        if (
          !calledPeersRef.current.includes(remotePeerID) &&
          remotePeerID !== peerService.peerId
        ) {
          // Ajoutez la condition pour filtrer votre propre ID
          console.log('CALL to ' + remotePeerID); // Log pour le peer que vous appelez

          if (streamRef.current) {
            const call = peerService.makeCall(remotePeerID, streamRef.current);
            calledPeersRef.current.push(remotePeerID);
            console.log('Current Called Peers:', calledPeersRef.current);
          } else {
            console.error('Stream is not initialized'); // Log d'erreur
          }
        }
      });
    }

    // Écouteur pour l'événement 'join-channel'
    socket.on('join-channel', (data) => {
      console.log('Un utilisateur a rejoint la salle :', data.peerID);
      // Mettez à jour l'état ou effectuez d'autres actions ici
    });

    // Nettoyer l'écouteur à la désactivation du composant
    return () => {
      socket.off('join-channel', (data) => console.log('data : ', data));
    };
  }, [peerList]);

  useEffect(() => {}, [socket]);

  return (
    <>
      <div>
        <audio ref={localAudioRef} autoPlay muted />
      </div>
      <div>
        <audio ref={remoteAudioRef} autoPlay />
      </div>
    </>
  );
}
