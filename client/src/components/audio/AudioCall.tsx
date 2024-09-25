import { useEffect, useRef, useState } from 'react';
import PeerService from '../../services/peerService';

const peerService = new PeerService();

export function AudioCall() {
  const localAudioRef = useRef<HTMLAudioElement | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const [remotePeerID, setRemotePeerID] = useState('');

  const streamRef = useRef<MediaStream | null>(null);

  // Fonction pour gérer les appels sortants
  const callHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('CALL to ' + remotePeerID);

    // Utilise le service peer pour passer un appel à l'ID distant avec le flux média local
    const call = peerService.makeCall(
      remotePeerID, // ID du peer distant
      streamRef.current as MediaStream // Flux média local
    );

    // Écoute l'événement 'stream' pour recevoir le flux audio du peer distant
    call.on('stream', (remoteStream) => {
      // Vérifie si la référence à l'élément audio distant est disponible
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = remoteStream; // Définit le flux distant comme source de l'élément audio
      }
    });
  };

  // Effet pour gérer les appels entrants et obtenir le flux média local
  useEffect(() => {
    // Gère les appels entrants
    peerService.onCall((remoteCall) => {
      console.log('Incoming call:', remoteCall); // Affiche les détails de l'appel entrant
      remoteCall.answer(streamRef.current as MediaStream); // Répond à l'appel avec le flux média local

      // Écoute l'événement 'stream' pour recevoir le flux audio du peer distant
      remoteCall.on('stream', (remoteStream) => {
        // Vérifie si la référence à l'élément audio distant est disponible
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream; // Définit le flux distant comme source de l'élément audio
        }
      });
    });

    // Obtenez le flux média local (microphone)
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true }) // Demande l'accès au microphone
      .then((stream) => {
        streamRef.current = stream; // Stocke le flux média dans la référence
        // Vérifie si la référence à l'élément audio local est disponible
        if (localAudioRef.current) {
          localAudioRef.current.srcObject = stream; // Définit le flux local comme source de l'élément audio
        }
      });
  }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une seule fois lors du montage du composant

  return (
    <>
      <form onSubmit={callHandler}>
        <input
          value={remotePeerID}
          onChange={(e) => setRemotePeerID(e.target.value)}
          placeholder='Enter remote Peer ID'
        />
        <button type='submit'>CALL</button>
      </form>

      <div>
        <audio ref={localAudioRef} autoPlay muted />
      </div>
      <div>
        <audio ref={remoteAudioRef} autoPlay />
      </div>
    </>
  );
}
