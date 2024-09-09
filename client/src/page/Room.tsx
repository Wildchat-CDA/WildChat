import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import { VideoPlayer } from "../components/VideoPlayer";
import { PeerState } from "../reducer/PeerReducer";
import ButtonHP from "../components/ButtonHP";

export const Room = () => {
  const { id } = useParams();
  const { ws, me, stream, peers } = useContext(RoomContext);
  const [muted, setMuted] = useState(false);

  
  useEffect(() => {
    if (me) ws.emit("join-room", { roomId: id, peerId: me._id });
  }, [id, me, ws]);

  return (
    <>
      Room id {id}
      <div>
       
        <VideoPlayer stream={stream}  muted={muted} />
       
        {Object.values(peers as PeerState).map((peer, index) => (
          <VideoPlayer key={index} stream={peer.stream} muted={muted}  />
        ))}
      </div>

      <ButtonHP muted={muted} setMuted={setMuted} />
    </>
  );
};