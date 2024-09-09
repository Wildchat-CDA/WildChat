import React, { useContext, useEffect } from "react"
import { RoomContext } from "../context/RoomContext"

export const Join: React.FC = () => {
    const {ws} = useContext(RoomContext)
    const createRoom = () => {
        ws.emit("create-room")
    }

    useEffect(() => {
    createRoom()
    }, [])

    return(
        <button 
            onClick={createRoom}>
            Call
        </button>
    )
}