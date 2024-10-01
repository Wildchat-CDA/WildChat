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
      console.log('Peer ID ouvert:', this.peerId);
    });

    this.peer.on('error', (err) => {
      console.error('Erreur PeerJS:', err);
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
          console.log('ID du Peer obtenu:', id);
          resolve(id);
        });
      }
    });
  }

  // Récupérer tous les Peer ID d'une room
  async getAllPeerIds(currentChannel: ISectionChannel): Promise<string[]> {
    try {
      const peerList = await loadPeerList(currentChannel);
      console.log('Liste des peers obtenue:', peerList);
      return peerList;
    } catch (error) {
      console.error('Erreur lors de la récupération des Peer IDs:', error);
      return [];
    }
  }

  // Méthode pour gérer les appels entrants
  onCall(callback: (call: MediaConnection) => void) {
    this.peer.on('call', (call) => {
      console.log('Appel entrant reçu de:', call.peer);
      callback(call);
    });
  }

  // Nouvelle méthode pour couper tous les appels actifs via la peerList
  public hangUpAllCalls(peerList: string[]) {
    peerList.forEach((remotePeerId) => {
      const connections = this.peer.getConnections(remotePeerId);

      if (connections.length > 0) {
        connections.forEach((connection) => {
          console.log(`Terminer l'appel avec: ${remotePeerId}`);
          connection.close(); // Fermer chaque connexion active avec ce peerId
        });
      } else {
        console.log(`Aucune connexion active avec: ${remotePeerId}`);
      }
    });

    console.log(
      'Tous les appels ont été terminés pour les peerIds dans peerList.'
    );
  }

  // Nouvelle méthode pour passer un appel
  makeCall(remotePeerId: string, stream: MediaStream): MediaConnection | null {
    if (!this.peer) {
      console.error('Peer non initialisé');
      return null;
    }
    console.log(`Passer un appel à: ${remotePeerId}`);

    const call = this.peer.call(remotePeerId, stream);

    if (!call) {
      console.error(`Échec de l'appel à: ${remotePeerId}`);
      return null;
    } else {
      console.log(`Appel initié avec: ${remotePeerId}`);
    }

    // Ajout de l'écoute des événements 'stream' et 'close'
    call.on('stream', (remoteStream) => {
      console.log("Flux distant reçu pendant l'appel:", remoteStream);
    });

    call.on('close', () => {
      console.log(`Appel terminé avec: ${remotePeerId}`);
    });

    call.on('error', (err) => {
      console.error("Erreur pendant l'appel:", err);
    });

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
    try {
      const peerId = await this.getPeerId();
      if (peerId) {
        console.log('Peer ID dans le service:', peerId);
        await this.setupLocalStream(streamRef, localAudioRef);
        this.setupIncomingCalls(
          streamRef,
          remoteAudioRef,
          socket,
          peerId,
          currentSection,
          setPeerList
        ),
          await this.setupPeerList(currentSection, peerId, setPeerList, socket);
      }
    } catch (error) {
      console.error("Erreur lors de l'initialisation de l'appel audio:", error);
    }
  }

  // Récuperation des peerId dans la room, et ajout du nouvel peerId
  public async setupPeerList(
    currentSection: ISectionChannel,
    peerId: string | null,
    setPeerList: (peers: string[]) => void,
    socket: any
  ) {
    const payload = {
      peerId,
      roomUuid: currentSection.uuid,
    };
    console.log('Rejoindre le canal avec le payload:', payload);
    socket.emit('join-channel', payload);

    try {
      let peerList = await this.getAllPeerIds(currentSection);
      peerList = peerList.filter((id) => id !== peerId); // Filtrer pour exclure soi-même
      console.log('Liste des peers après filtrage:', peerList);
      setPeerList(peerList);
    } catch (error) {
      console.error(
        'Erreur lors de la configuration de la liste des peers:',
        error
      );
    }
  }

  // Configuration des appels entrants
  private setupIncomingCalls(
    streamRef: React.MutableRefObject<MediaStream | null>,
    remoteAudioRef: React.RefObject<HTMLAudioElement>,
    socket,
    peerId,
    currentSection,
    setPeerList
  ) {
    this.onCall((remoteCall) => {
      console.log('Appel entrant de:', remoteCall.peer);

      if (streamRef.current) {
        console.log('Répondre avec le flux local');
        remoteCall.answer(streamRef.current); // Répondre avec le flux local
      } else {
        console.error(
          "Flux local non initialisé lors de la réponse à l'appel."
        );
      }

      remoteCall.on('stream', (remoteStream) => {
        console.log('Flux distant reçu:', remoteStream);
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
          console.log("Le flux distant est attaché à l'audio.");
        }
      });

      remoteCall.on('close', () => {
        const payload = {
          peerId: remoteCall.peer,
          roomUuid: currentSection.uuid,
        };
        socket.emit('leave-channel', payload);
        setPeerList((prevPeerList) =>
          prevPeerList.filter((id) => id !== peerId)
        );

        console.log('Appel terminé avec:', remoteCall.peer);
      });

      remoteCall.on('error', (err) => {
        console.error("Erreur pendant l'appel:", err);
      });
    });
  }

  // Configuration du flux local
  // Méthode setupLocalStream
  private async setupLocalStream(
    streamRef: React.MutableRefObject<MediaStream | null>,
    localAudioRef: React.RefObject<HTMLAudioElement>
  ) {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      streamRef.current = stream; // Ici on définit le stream
      console.log('Flux audio local après initialisation:', streamRef.current);

      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
        console.log('Le flux audio local est bien défini');
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'accès aux périphériques multimédia:",
        error
      );
    }
  }
}
