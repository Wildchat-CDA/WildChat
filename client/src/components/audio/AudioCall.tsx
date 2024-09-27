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
      console.log('Stream après initialisation:', streamRef.current);
    };

    initializeCall();
    socket.on('join-channel', (data) => {
      setPeerList((prevState) => [...prevState, data.peerID]);
    });
    console.log('remote audio ref : ', remoteAudioRef);
  }, [currentSection]);

  useEffect(() => {
    if (peerList.length > 0) {
      console.log('Called Peer Ref : ', calledPeersRef.current);

      peerList.forEach((remotePeerID) => {
        console.log('remotePeerId : ', remotePeerID);
        console.log('peerService.peerId : ', peerService.peerId);
        if (
          !calledPeersRef.current.includes(remotePeerID) &&
          remotePeerID !== peerService.peerId
        ) {
          if (streamRef.current) {
            console.log('streamm Ref Current : ', streamRef.current);
            peerService.makeCall(remotePeerID, streamRef.current);
            calledPeersRef.current.push(remotePeerID);
            console.log('Current Called Peers:', calledPeersRef.current);
          } else {
            console.error('Stream is not initialized');
          }
        }
      });
    }

    return () => {
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
