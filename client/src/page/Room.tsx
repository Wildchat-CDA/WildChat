import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { VideoPlayer } from "../components/VideoPlayer";
import { PeerState } from "../context/PeerReducer";

export const Room = () => {
  const { id } = useParams();
  const { ws, me, stream, peers } = useContext(RoomContext);

  
  useEffect(() => {
    if (me) ws.emit("join-room", { roomId: id, peerId: me._id });
  }, [id, me, ws]);

  return (
    <>
      Room id {id}
      <div>
       
        <VideoPlayer stream={stream} />

       
        {Object.values(peers as PeerState).map((peer, index) => (
          <VideoPlayer key={index} stream={peer.stream} />
        ))}
      </div>
    </>
  );
};
