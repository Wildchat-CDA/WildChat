import Peer, { MediaConnection } from 'peerjs';

export default class PeerService {
  private peer = new Peer();
  private _peerId: string | null = null;
  private _localStream: MediaStream | null = null;
  private _activeCalls: MediaConnection[] = [];

  constructor() {
    this.peer = new Peer();

    this.peer.on('open', (id) => {
      this._peerId = id;
      console.log('Peer ID ouvert:', this._peerId);
    });

    this.peer.on('error', (err) => {
      console.error('Erreur PeerJS:', err);
    });

    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        this._localStream = stream;
      });
  }

  get peerId() {
    return this._peerId;
  }

  get localStream() {
    return this._localStream;
  }

  addNewPeer(remotePeerId, audioRef) {
    if (this._localStream === null) throw new Error('local stream is missing');
    const call = this.peer.call(remotePeerId, this._localStream);
    call.on('stream', (remoteStream) => {
      //TODO Ajouter le flux a l'audio
      audioRef.srcObject = remoteStream;
    });
    this._activeCalls.push(call);

    this.peer.on('call', (remoteCall) => {
      remoteCall.answer(this._localStream);
      remoteCall.on('stream', (remoteStream) => {
        //TODO Ajouter le flux audio
        audioRef.srcObject = remoteStream;
      });
    });
  }

  closeCalls() {
    for (let call of this._activeCalls) {
      call.close();
    }
    this._activeCalls = [];
  }
}
