import React, {useEffect, useRef} from "react";
import ButtonHP from "./ButtonHP";

export const VideoPlayer: React.FC<{stream: MediaStream, muted: boolean}> = ({stream, muted = false}) => {
const videoRef = useRef<HTMLVideoElement>(null)


useEffect(() => {
   if (videoRef.current) videoRef.current.srcObject = stream;
}, [stream])

console.log("herere muted vide", muted)

    return (
        <>
        <video ref={videoRef} autoPlay muted={muted}/>
        </>
        
    );
}