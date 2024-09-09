// import React, { useContext, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { RoomContext } from "../context/RoomContext";
// import Peer from "peerjs";
// import { VideoPlayer } from "../components/VideoPlayer";
// import { PeerState } from "../context/PeerReducer";

// export const Room = () => {
//     const {id} = useParams();
//     const {ws, me, stream, peers} = useContext(RoomContext);

// useEffect(() => {
//    if (me) ws.emit("join-room", { roomId:id, PeerId: me._id})
// }, [id, me, ws]);

// return (
//     <>
//     Room id {id}
//     <div>
//         <VideoPlayer stream={stream} />
       

//         {Object.values(peers as PeerState).map((peer) => {
//             <VideoPlayer stream={peer.stream} />
//         })}
         
//     </div>
//     </>

// )

// }

import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { VideoPlayer } from "../components/VideoPlayer";
import { PeerState } from "../context/PeerReducer";

export const Room = () => {
  const { id } = useParams();
  const { ws, me, stream, peers } = useContext(RoomContext);

  // Rejoindre la room à partir de son ID
  useEffect(() => {
    if (me) ws.emit("join-room", { roomId: id, peerId: me.id });
  }, [id, me, ws]);

  return (
    <>
      Room id {id}
      <div>
        {/* Afficher le flux local de l'utilisateur */}
        <VideoPlayer stream={stream} />

        {/* Afficher les flux des autres participants */}
        {Object.values(peers as PeerState).map((peer, index) => (
          <VideoPlayer key={index} stream={peer.stream} />
        ))}
      </div>
    </>
  );
};
