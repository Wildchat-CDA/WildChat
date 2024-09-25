import Peer, { MediaConnection } from 'peerjs';

export default class PeerService {
  private peer: Peer;
  private peerId: string | null = null;

  constructor() {
    this.peer = new Peer();
    this.peer.on('open', (id) => {
      this.peerId = id;
      console.log('Peer IDDD:', this.peerId);
    });
  }

  // Méthode pour obtenir l'ID du peer
  getPeerId(): string | null {
    return this.peerId;
  }

  // Méthode pour gérer les appels entrants
  onCall(callback: (call: MediaConnection) => void) {
    this.peer.on('call', callback);
  }

  // Nouvelle méthode pour passer un appel
  makeCall(remotePeerId: string, stream: MediaStream): MediaConnection {
    const call = this.peer.call(remotePeerId, stream);
    return call;
  }
}
