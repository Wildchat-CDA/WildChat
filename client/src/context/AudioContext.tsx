import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Peer, { MediaConnection } from 'peerjs';
import io, { Socket } from 'socket.io-client';
import { User, ChannelInfo, JoinChannelResponse } from '../types/audioTypes';


const apiUrl = `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`;

const SOCKET_SERVER = apiUrl; 

export const AudioContext = createContext<any>(null);

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudioContext must be used within an AudioProvider');
  }
  return context;
}

export const AudioProvider: React.FunctionComponent<{
  children: React.ReactNode;
  isMuted: boolean;
}> = ({ children, isMuted }) => {
  const [myPeerID, setMyPeerID] = useState<string>('');
  const [channelUUID, setChannelUUID] = useState<string>('');
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);

  const localAudioRef = useRef<HTMLAudioElement>(null);
  const remoteAudioRef = useRef<HTMLAudioElement>(null);
  const peerRef = useRef<Peer | null>(null);
  const socketRef = useRef<Socket | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const connectionsRef = useRef<Map<string, MediaConnection>>(new Map());

  useEffect(() => {
    const initializePeerAndSocket = async () => {
      peerRef.current = new Peer();
      console.log('PeerRef AudioContext :', peerRef.current);

      peerRef.current.on('open', (peerID) => {
        setMyPeerID(peerID);

        socketRef.current = io(SOCKET_SERVER);
        
        
        socketRef.current.emit('join-channel', { peerID }, (response: JoinChannelResponse) => {
          setChannelUUID(response.channelUUID);
        });

        socketRef.current.emit(
          'join-channel',
          { peerID },
          (response: JoinChannelResponse) => {
            setChannelUUID(response.channelUUID);
          }
        );
        console.log('sockerRef.current AudioContext :', socketRef.current);
        setupSocketListeners();
      });

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: true,
        });
        console.log('stream : ', stream);
        streamRef.current = stream;
        if (localAudioRef.current) {
          localAudioRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Erreur d'accès aux périphériques médias :", err);
      }
    };

    initializePeerAndSocket();

    return () => {
      cleanup();
    };
  }, []);

  const setupSocketListeners = () => {
    if (!socketRef.current) return;
    socketRef.current.on('user-joined', (data: { users: User[] }) => {
      console.log('DATA : ', data);
      setConnectedUsers(data.users);
      const newUser = data.users.find((user) => user.peerID !== myPeerID);
      if (newUser && streamRef.current) {
        callUser(newUser.peerID);
      }
    });
    socketRef.current.on(
      'user-disconnected',
      (data: { peerID: string; uuid: string; users: User[] }) => {
        setConnectedUsers(data.users);
        const connection = connectionsRef.current.get(data.peerID);
        if (connection) {
          connection.close();
          connectionsRef.current.delete(data.peerID);
        }
      }
    );
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
    connectionsRef.current.forEach((connection) => connection.close());
  };

  useEffect(() => {
    if (peerRef.current) {
      peerRef.current.on('call', handleIncomingCall);
      console.log('local :', localAudioRef);
      console.log('remote : ', remoteAudioRef);
    }

    return () => {
      if (peerRef.current) {
        peerRef.current.off('call', handleIncomingCall);
      }
    };
  }, []);

  const handleIncomingCall = (call: MediaConnection) => {
    if (streamRef.current) {
      call.answer(streamRef.current);
      call.on('stream', (remoteStream: MediaStream) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
        }
      });
      connectionsRef.current.set(call.peer, call);
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
      connectionsRef.current.set(remotePeerID, call);
    }
  };

  const contextValue = {
    peerRef,
    socketRef,
    myPeerID,
    channelUUID,
    connectedUsers,
    localAudioRef,
    remoteAudioRef,
    callUser,
    handleIncomingCall,
    setChannelUUID,
  };

  const isMute = () => {};

  isMute();

  return (
    <AudioContext.Provider value={contextValue}>
      {children}
      <audio ref={localAudioRef} autoPlay playsInline muted={isMuted} />
      <audio ref={remoteAudioRef} autoPlay playsInline muted={isMuted} />
    </AudioContext.Provider>
  );
};
