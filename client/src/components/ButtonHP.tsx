import React, { useEffect, useRef } from 'react'

export default function ButtonHP({
    mute = false,
    setMute
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
          track.enabled = !mute;
        });
        setMute(!mute);
      }
    };
  

    const handleMute = async () => {
        let audioContext = await new (window.AudioContext);
        console.log("here son is ", audioContext)
        if (audioContext.state === 'running') {
            audioContext.suspend(); // Mute all audio
          } else if (audioContext.state === 'suspended') {
            audioContext.resume(); // Unmute all audio
          }
        setMute(!mute);
    }
  return (
    <div>
        <img src={mute ? './no-mute.png' : "./mute.png"} onClick={handleMute} style={{background: "white", cursor: "pointer"}} /> 
    </div>
  )
}
