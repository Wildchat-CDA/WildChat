import React, {useEffect, useRef} from "react";
import ButtonHP from "./ButtonHP";

export const VideoPlayer: React.FC<{stream: MediaStream}> = ({stream}) => {
const videoRef = useRef<HTMLVideoElement>(null)


useEffect(() => {
   if (videoRef.current) videoRef.current.srcObject = stream;
}, [stream])

    return (
        <>
        <video ref={videoRef} autoPlay muted={true}/>
        </>
        
    );
}