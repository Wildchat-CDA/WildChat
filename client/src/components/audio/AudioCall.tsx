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
  const peerManagerRef = useRef(false);

  useEffect(() => {
    loadPeerList(currentSection).then((result) => setPeerList(result));
    console.log('current section :', currentSection.uuid);
    console.log('peerId : ', peerService.peerId);

    if (peerService.peerId) {
      socket.emit('join-channel', {
        peerId: peerService.peerId,
        roomUuid: currentSection.uuid,
      });
    }

    const joinChannel = (data) => {
      //TODO
      peerManagerRef.current = true;
      setPeerList((prevState) => [...prevState, data.peerId]);
      console.log('DATA : ', data);
    };

    socket.on('join-channel', joinChannel);
    return () => {
      socket.off('join-channel', joinChannel);
      socket.emit('leave-channel', {
        peerId: peerService.peerId,
        roomUuid: currentSection.uuid,
      });
      peerService.closeCalls();
    };
  }, []);

  useEffect(() => {
    if (peerManagerRef.current === false) {
      for (let obj of audiosRef.current) {
        peerService.addNewPeer(obj.peerId, obj.audioRef);
      }
    } else {
      const obj = audiosRef.current[audiosRef.current.length - 1];
      peerService.addNewPeer(obj.peerId, obj.audioRef);
      peerManagerRef.current = false;
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
