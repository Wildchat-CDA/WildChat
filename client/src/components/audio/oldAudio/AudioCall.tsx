import { useEffect, useRef, useState } from 'react';
import Peer, { MediaConnection } from 'peerjs';
import io, { Socket } from 'socket.io-client';
import { User, ChannelInfo, JoinChannelResponse } from '../../../types/audioTypes';

const SOCKET_SERVER = 'http://localhost:3000';

export function AudioCall(): JSX.Element {
  const [myPeerID, setMyPeerID] = useState<string>('');
  const [channelUUID, setChannelUUID] = useState<string>('');
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);

  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const peerRef = useRef<Peer | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const initializePeerAndSocket = async () => {
      peerRef.current = new Peer();

      peerRef.current.on('open', (peerID) => {
        setMyPeerID(peerID);

        socketRef.current = io(SOCKET_SERVER);
        socketRef.current.emit(
          'join-channel',
          { peerID },
          (response: JoinChannelResponse) => {
            setChannelUUID(response.channelUUID);
          }
        );

        setupSocketListeners();
      });

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });
        streamRef.current = stream;
        if (localAudioRef.current) {
          localAudioRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing media devices:', err);
      }
    };

    initializePeerAndSocket();

    return () => {
      cleanup();
    };
  }, []);

  const setupSocketListeners = () => {
    console.log('je passe');
    if (!socketRef.current) return;

    socketRef.current.on('user-joined', (data: { users: User[] }) => {
      setConnectedUsers(data.users);
      const newUser = data.users.find((user) => user.peerID !== myPeerID);
      if (newUser && streamRef.current) {
        callUser(newUser.peerID);
      }
    });

    socketRef.current.on('user-left', (data: { users: User[] }) => {
      setConnectedUsers(data.users);
    });

    socketRef.current.emit('request-channel-info', (info: ChannelInfo) => {
      setChannelUUID(info.channelUUID);
      setConnectedUsers(info.users);
    });
  };

  const cleanup = () => {
    if (socketRef.current) {
      socketRef.current.emit('leave-channel', { peerID: myPeerID });
      socketRef.current.disconnect();
    }
    if (peerRef.current) {
      peerRef.current.destroy();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  useEffect(() => {
    if (peerRef.current) {
      peerRef.current.on('call', handleIncomingCall);
    }
  }, []);

  const handleIncomingCall = (call: MediaConnection) => {
    if (streamRef.current) {
      call.answer(streamRef.current);
      call.on('stream', (remoteStream: MediaStream) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
        }
      });
    }
  };

  const callUser = (remotePeerID: string) => {
    if (streamRef.current && peerRef.current) {
      const call = peerRef.current.call(remotePeerID, streamRef.current);
      call.on('stream', (remoteStream) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
        }
      });
    }
  };

  return (
    <div>
      <h2>Audio Call</h2>
      <p>Channel UUID: {channelUUID || 'Waiting for channel...'}</p>
      <p>My Peer ID: {myPeerID || 'Connecting...'}</p>
      <p>Connected Users: {connectedUsers.length}</p>
      <ul>
        {connectedUsers.map((user) => (
          <li key={user.uuid}>
            {user.peerID === myPeerID ? `${user.peerID} (You)` : user.peerID}
          </li>
        ))}
      </ul>
      <audio ref={localAudioRef} autoPlay playsInline />
      <audio ref={remoteAudioRef} autoPlay playsInline />
    </div>
  );
}
