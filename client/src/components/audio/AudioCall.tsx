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

  const clearPeerId = () => {
    const payload = {
      peerId: peerService.peerId,
      roomUuid: currentSection.uuid,
    };
    socket.emit('leave-channel', payload);
  };

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
    clearPeerId();
    initializeCall();
  }, [currentSection]);

  useEffect(() => {
    if (peerList.length > 0) {
      peerList.forEach((remotePeerID) => {
        if (
          !calledPeersRef.current.includes(remotePeerID) &&
          remotePeerID !== peerService.peerId
        ) {
          if (streamRef.current) {
            peerService.makeCall(remotePeerID, streamRef.current);
            calledPeersRef.current.push(remotePeerID);
            console.log('Current Called Peers:', calledPeersRef.current);
          } else {
            console.error('Stream is not initialized');
          }
        }
      });
    }

    // Écouteur pour l'événement 'join-channel'
    // socket.on('join-channel', (data) => {
    //   console.log('Un utilisateur a rejoint la salle :', data.peerID);
    // });

    // Écouteur pour l'événement 'leave-channel'

    // socket.emit('leave-channel', (data) => {
    //   const { peerId: peerID, roomUuid } = data;

    //   console.log('Un utilisateur a quitté la salle :', peerID);

    //   // Retirer le peerID de la liste
    //   setPeerList((prevPeerList) => prevPeerList.filter((id) => id !== peerID));
    //   console.log('JE PASSE : ');

    //   // Si cet utilisateur est en appel, stopper le flux audio
    //   if (calledPeersRef.current.includes(peerID)) {
    //     calledPeersRef.current = calledPeersRef.current.filter(
    //       (id) => id !== peerID
    //     );
    //     if (remoteAudioRef.current) {
    //       remoteAudioRef.current.srcObject = null; // Stopper le flux audio
    //     }
    //     console.log('Peer call stopped and removed:', peerID);
    //   }
    // });

    // Nettoyer les écouteurs à la désactivation du composant

    return () => {
      console.log('je passe return');
      socket.off('join-channel', (data) => console.log('data : ', data));
      socket.off('leave-channel', (data) => console.log('data : ', data));
    };
  }, [peerList]);

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
