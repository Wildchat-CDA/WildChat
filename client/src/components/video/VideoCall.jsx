import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";

const peer = new Peer();

export function VideoCall() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [remotePeerID, setRemotePeerID] = useState("");

  const peerID = useRef("");
  const streamRef = useRef(null);

  const callHandler = (e) => {
    e.preventDefault();
    console.log("CALL to " + remotePeerID);
    const call = peer.call(remotePeerID, streamRef.current);
    call.on("stream", (remoteStream) => {
      remoteVideoRef.current.srcObject = remoteStream;
    });

    peer.on("call", (remoteCall) => {
      remoteCall.answer(streamRef.current);
      remoteCall.on("stream", (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
      });
    });
  };

  useEffect(() => {
    peer.on("open", (myPeerID) => {
      peerID.current = myPeerID;
      console.log(peerID, "open PEER ID");
    });

    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        localVideoRef.current.srcObject = stream;
      });
  }, []);

  return (
    <>
      <div>
        <div>
          <p>
            {" "}
            My PeerID :{" "}
            {peerID.current !== "" ? peerID.current : "NO PEER ID YET"}
          </p>
          <p>
            Remote Peer ID :{" "}
            {remotePeerID !== "" ? remotePeerID : "NO PEER ID YET"}
          </p>
        </div>

        <form onSubmit={callHandler}>
          <input
            value={remotePeerID}
            onChange={(e) => setRemotePeerID(e.target.value)}
          />
          <button type="submit">CALL</button>
        </form>
      </div>

      <div>
        <h2>local</h2>
        <video ref={localVideoRef} autoPlay></video>
      </div>
      <div>
        <h2>remote</h2>
        <video ref={remoteVideoRef} autoPlay></video>
      </div>
    </>
  );
}
