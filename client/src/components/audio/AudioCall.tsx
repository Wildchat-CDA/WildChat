import { useEffect, useRef, useState } from 'react';
import PeerService from '../../services/peerJS/peerService';
import socket from '../../services/webSocketService';
import { loadPeerList } from '../../services/peerJS/fetchPeerList';

const peerService = new PeerService();

export function AudioCall({ currentSection }) {
  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const [peerList, setPeerList] = useState<string[]>([]);
  const audiosRef = useRef<any>([]);

  useEffect(() => {
    loadPeerList(currentSection).then((result) => setPeerList(result));
    console.log('current section :', currentSection.uuid);
    console.log('peerId : ', peerService.peerId);

    const joinChannel = (data) => {
      //TODO
    };

    socket.on('join-channel', joinChannel);
    return () => {
      socket.off('join-channel', joinChannel);
    };
  }, []);

  useEffect(() => {
    for (let obj of audiosRef.current) {
      peerService.addNewPeer(obj.peerId, obj.audioRef);
    }
  }, [peerList]);

  return (
    <>
      {peerList.map((peerId, index) => (
        <div key={index}>
          <audio
            ref={(audioRef) =>
              (audiosRef.current[index] = { audioRef, peerId })
            }
            autoPlay
          />
        </div>
      ))}
    </>
  );
}
