import React, { useEffect, useRef } from 'react'

export default function ButtonHP({
    muted = false,
    setMuted
}) {

    const mediaStreamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
      
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          mediaStreamRef.current = stream;
        })
        .catch(err => {
          console.error('error microphone :', err);
        });
  
     
      return () => {
        if (mediaStreamRef.current) {
          mediaStreamRef.current.getTracks().forEach(track => track.stop());
        }
      };
    }, []);
  
    const toggleMute = () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getAudioTracks().forEach(track => {
          track.enabled = !muted;
        });
        setMuted(!muted);
      }
    };
  

    const handleMute = async () => {
        setMuted(!muted);
        console.log("muted", muted)
       
    }
  return (
    <div>
        <img src={muted ? '/no-mute.png' : "/mute.png"} onClick={handleMute} style={{background: "white", cursor: "pointer", width: "30px"}} /> 
    </div>
  )
}
