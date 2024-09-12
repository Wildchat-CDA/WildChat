import React, { useContext, useEffect } from "react"
import { RoomContext } from "../context/RoomContext"

export const Join: React.FC = () => {
    const {socket} = useContext(RoomContext)
    const createRoom = () => {
        socket.emit("create-room")
    }

    useEffect(() => {
    createRoom()
    }, [])

    return(
        <button 
            onClick={createRoom}>
            +
           
        </button>
    )
}