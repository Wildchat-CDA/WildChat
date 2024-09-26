import Peer, { MediaConnection } from 'peerjs';
import { loadPeerList } from './fetchPeerList';
import { ISectionChannel } from '../../types/sectionTypes';

export default class PeerService {
  private peer: Peer;
  public peerId: string | null = null;

  constructor() {
    this.peer = new Peer();
    this.peer.on('open', (id) => {
      this.peerId = id;
      console.log('Peer IDDD:', this.peerId);
    });
  }

  // Méthode pour obtenir l'ID du peer avec une promesse
  async getPeerId(): Promise<string | null> {
    return new Promise((resolve) => {
      if (this.peerId) {
        resolve(this.peerId);
      } else {
        // Attendre que l'événement 'open' soit déclenché
        this.peer.on('open', (id) => {
          resolve(id);
        });
      }
    });
  }

  // Récupérer tous les Peer ID d'une room
  getAllPeerIds = async (currentChannel: ISectionChannel) => {
    return loadPeerList(currentChannel);
  };

  // Méthode pour gérer les appels entrants
  onCall(callback: (call: MediaConnection) => void) {
    this.peer.on('call', callback);
  }

  // Nouvelle méthode pour passer un appel
  makeCall(remotePeerId: string, stream: MediaStream): MediaConnection {
    if (!this.peer) {
      throw new Error('Peer not initialized');
    }
    const call = this.peer.call(remotePeerId, stream);
    return call;
  }

  // Initialiser l'appel audio
  async initializeAudioCall(
    currentSection: ISectionChannel,
    streamRef: React.MutableRefObject<MediaStream | null>,
    localAudioRef: React.RefObject<HTMLAudioElement>,
    remoteAudioRef: React.RefObject<HTMLAudioElement>,
    socket: any,
    setPeerList: (peers: string[]) => void
  ) {
    const peerId = await this.getPeerId();
    if (peerId) {
      console.log('Peer ID in service:', peerId);

      await this.setupLocalStream(streamRef, localAudioRef);
      this.setupIncomingCalls(streamRef, remoteAudioRef);
      await this.setupPeerList(currentSection, peerId, setPeerList, socket); // Assurez-vous que la liste des pairs est configurée
    }
  }

  // Récuperaton des peerId dans la room, et ajout du nouvel peerId
  private async setupPeerList(
    currentSection: ISectionChannel,
    peerId: string,
    setPeerList: (peers: string[]) => void,
    socket: any
  ) {
    const payload = {
      peerId,
      roomUuid: currentSection.uuid,
    };
    socket.emit('join-channel', payload);

    // Mettez à jour la liste des pairs après avoir rejoint la salle
    let peerList = await this.getAllPeerIds(currentSection);

    // Filtrer la liste pour retirer le propre peerId
    peerList = peerList.filter((id) => id !== peerId);

    // Mettre à jour le state avec la liste filtrée
    setPeerList(peerList);
  }

  // Configuration des appels entrants
  private setupIncomingCalls(
    streamRef: React.MutableRefObject<MediaStream | null>,
    remoteAudioRef: React.RefObject<HTMLAudioElement>
  ) {
    this.onCall((remoteCall) => {
      console.log('Incoming call:', remoteCall);
      if (streamRef.current) {
        remoteCall.answer(streamRef.current); // Répondre à l'appel avec le flux local
      } else {
        console.error('Local stream not initialized when answering call.');
      }

      remoteCall.on('stream', (remoteStream) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
        }
      });
    });
  }

  // Configuration du flux local
  private async setupLocalStream(
    streamRef: React.MutableRefObject<MediaStream | null>,
    localAudioRef: React.RefObject<HTMLAudioElement>
  ) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });

      streamRef.current = stream;

      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
        console.log('Local audio stream set up successfully');
      }
    } catch (error) {
      console.error('Error accessing media devices.', error);
    }
  }
}
