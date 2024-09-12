import React, { createContext, useState, useEffect, useReducer } from "react";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
import socket from "../services/webSocketService"
import { v4 as uuidV4 } from "uuid";
import Peer from "peerjs";
import { addAllPeersAction, addPeerAction, IPeer, removePeerAction } from "../reducer/PeerReducer";
import { peerReducer, PeerState } from "../reducer/PeerReducer"; 
import GlobalCall from "../GlobalCall";
//import { Room } from "../page/Room";

export const RoomContext = createContext<null | any>(null);

export const RoomProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  //const navigate = useNavigate();

  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  
  const [peers, dispatch] = useReducer(peerReducer, {} as PeerState);

  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log({ roomId });
 //   navigate(`/room/${roomId}`); 
  };

  const getUsers = ({ participants }: { participants: Record<string, IPeer>; }) => {
    dispatch(addAllPeersAction(participants));
    console.log("participants is", participants);
  };
 

  const removePeer = (peerId: string) => {
    dispatch(removePeerAction(peerId));
  };
  
  useEffect(() => {
    const meId = uuidV4(); 
    const peer = new Peer(meId);
    setMe(peer);
 
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
      })
      .catch((error) => {
        console.error(error);
      });

//      socket.on("room-created", enterRoom);
      socket.on("get-users", getUsers);    
      socket.on("user-disconnected", removePeer); 

    return () => {
     // socket.off("room-created", enterRoom);
      socket.off("get-users", getUsers);
      socket.off("user-disconnected", removePeer);
    };
  }, []);

  
  useEffect(() => {
    if (!me) return;   
    if (!stream) return; 

    const joinHandler = ({ peerId }: { peerId: string }) => {
      const call = me.call(peerId, stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream)); 
      });
    }
  

    socket.on("user-joined", joinHandler);

    me.on("call", (call) => {
      call.answer(stream); 
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream)); 
      });
    });

    return () => {
      socket.off("user-joined", joinHandler);
      //me.off("call");
    };
  }, [me, stream]);

  return (
    <RoomContext.Provider value={{ socket, me, stream, peers }}>
      {/* <GlobalCall></GlobalCall> */}
      {/* <Room/> */}
      {children}
    </RoomContext.Provider>
  );
};
