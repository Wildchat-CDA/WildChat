import React, { createContext,useState, useContext, useEffect } from "react";
import socketIOClient from "socket.io-client"
import {useNavigate} from "react-router-dom"
import {v4 as uuidV4} from "uuid"
import Peer from "peerjs";



const WS = "http://localhost:3000";  

export const RoomContext =createContext<null | any>(null);
const ws = socketIOClient(WS)

export const RoomProvider: React.FunctionComponent<{ children: React.ReactNode }> = ({children}) => {
const Navigate = useNavigate();
const [me, setMe] = useState<Peer>();
const [stream, setStream] = useState<MediaStream>()


const enterRoom = ({ roomId }: { roomId: "string" }) => {
    console.log({roomId})
    Navigate(`/room/${roomId}`)
}

const getUsers = ({participants} : {participants: string[] }) => {
    console.log("participants", participants)
}

useEffect(() =>{
    const meId = uuidV4();

    const peer = new Peer(meId);
    setMe(peer);


    try {
        navigator.mediaDevices.getUserMedia({video: true, audio: true})
        .then((stream) => {
            setStream(stream);
        });
    }catch(error){
        console.error(error)
    }

    ws.on("room-created", enterRoom)
    ws.on("get-users", getUsers)
},[])

useEffect(() => {
if (!me) return;
if (!stream) return; 

ws.on("user-joined", ({PeerId}) => {
    const call = me.call(PeerId, stream)
});

me.on("call", (call) => {
    call.answer(stream)
})
}, [me, stream ])


return(
    <RoomContext.Provider value={{ ws, me, stream }}>
        {children} 
    </RoomContext.Provider>
    
);

};
