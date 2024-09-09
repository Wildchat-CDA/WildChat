import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RoomContext } from "../context/RoomContext";
import Peer from "peerjs";
import { VideoPlayer } from "../components/VideoPlayer";

export const Room = () => {
    const {id} = useParams();
    const {ws, me, stream} = useContext(RoomContext);

useEffect(() => {
   if (me) ws.emit("join-room", { roomId:id, PeerId: me._id})
}, [id, me, ws]);

return (
    <>
    Room id {id}
    <div>
        <VideoPlayer stream={stream} />
    </div>
    </>

)

}