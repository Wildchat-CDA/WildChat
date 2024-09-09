import React, { createContext, useState, useEffect, useReducer } from "react";
import socketIOClient from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import Peer from "peerjs";
import { addPeerAction, removePeerAction } from "./PeerAction";
import { peerReducer } from "./PeerReducer"; 


const WS = "http://localhost:3000";  


export const RoomContext = createContext<null | any>(null);


const ws = socketIOClient(WS);

export const RoomProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

 
  const [me, setMe] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();

 
  const [peers, dispatch] = useReducer(peerReducer, {});

 
  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log({ roomId });
    navigate(`/room/${roomId}`); 
  };

  
  const getUsers = ({ participants }: { participants: string[] }) => {
    console.log("participants", {participants});
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

    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);    
    ws.on("user-disconnected", removePeer); 

    
    return () => {
      ws.off("room-created", enterRoom);
      ws.off("get-users", getUsers);
      ws.off("user-disconnected", removePeer);
    };
  }, []);

  
  useEffect(() => {
    if (!me) return;   
    if (!stream) return; 

    
    ws.on("user-joined", ({ peerId }: { peerId: string }) => {
      const call = me.call(peerId, stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream)); 
      });
    });

   
    me.on("call", (call) => {
      call.answer(stream); 
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream)); 
      });
    });

    
    return () => {
      ws.off("user-joined");
      me.off("call");
    };
  }, [me, stream]);

  
  return (
    <RoomContext.Provider value={{ ws, me, stream, peers }}>
      {children}
    </RoomContext.Provider>
  );
};
