import React, { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const peer = new Peer();

export function VideoCall(): JSX.Element {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const [remotePeerID, setRemotePeerID] = useState<string>("");

  const [myPeerID, setMyPeerID] = useState<string>("");
  const streamRef = useRef<MediaStream | null>(null);

  const callHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("CALL to " + remotePeerID);
    if (streamRef.current) {
      const call = peer.call(remotePeerID, streamRef.current);
      call.on("stream", (remoteStream: MediaStream) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
        }
      });
    }

    peer.on("call", (remoteCall) => {
      if (streamRef.current) {
        remoteCall.answer(streamRef.current);
        remoteCall.on("stream", (remoteStream: MediaStream) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
      }
    });
  };

  useEffect(() => {
    peer.on("open", (peerID: string) => {
      setMyPeerID(peerID);
    });

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      });
  }, []);

  return (
    <>
      <div>
        <div>
          <p>
            My PeerID : {myPeerID || "NO PEER ID YET"}
          </p>
          <p>
            Remote Peer ID : {remotePeerID || "NO PEER ID YET"}
          </p>
        </div>

        <form onSubmit={callHandler}>
          <input
            value={remotePeerID}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRemotePeerID(e.target.value)}
          />
          <button type="submit">CALL</button>
        </form>
      </div>

      <div>
        <h2>local</h2>
        <video ref={localVideoRef} autoPlay />
      </div>
      <div>
        <h2>remote</h2>
        <video ref={remoteVideoRef} autoPlay />
      </div>
    </>
  );
}