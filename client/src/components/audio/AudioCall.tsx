import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const peer = new Peer();

export function AudioCall(): JSX.Element {
  const localAudioRef = useRef<HTMLAudioElement | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  const [remotePeerID, setRemotePeerID] = useState("");
  const [myPeerID, setMyPeerID] = useState("");
  const streamRef = useRef<MediaStream | null>(null);

  const callHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("CALL to " + remotePeerID);
    if (streamRef.current) {
      const call = peer.call(remotePeerID, streamRef.current);
      call.on("stream", (remoteStream) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
        }
      });
    }

    peer.on("call", (remoteCall) => {
      if (streamRef.current) {
        remoteCall.answer(streamRef.current);
        remoteCall.on("stream", (remoteStream) => {
          if (remoteAudioRef.current) {
            remoteAudioRef.current.srcObject = remoteStream;
          }
        });
      }
    });
  };

  useEffect(() => {
    peer.on("open", (peerID) => {
      setMyPeerID(peerID);
      console.log(peerID, "open PEER ID");
    });

    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        if (localAudioRef.current) {
          localAudioRef.current.srcObject = stream;
        }
      });
  }, []);

  return (
    <>
      <div>
        <div>
          My PeerID : {myPeerID || "NO PEER ID YET"}
        </div>
        <div>
          Remote Peer ID : {remotePeerID || "NO PEER ID YET"}
        </div>
      </div>
      <form onSubmit={callHandler}>
        <input
          type="text"
          value={remotePeerID}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRemotePeerID(e.target.value)}
        />
        <button type="submit">CALL</button>
      </form>
      <div>
        <audio ref={localAudioRef} autoPlay muted playsInline />
        <p>local</p>
      </div>
      <div>
        <audio ref={remoteAudioRef} autoPlay playsInline />
        <p>remote</p>
      </div>
    </>
  );
}