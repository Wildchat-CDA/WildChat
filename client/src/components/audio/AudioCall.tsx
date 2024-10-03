import { useEffect, useRef, useState } from 'react';
import { peerService } from '../../services/peerJS/peerService';
import { webSocketService } from '../../services/webSocketService';
import { loadPeerList } from '../../services/peerJS/fetchPeerList';
import { ISectionChannel } from '../../types/sectionTypes';

interface IAudioProps {
  currentSection: ISectionChannel;
}

export interface IAudioRef {
  peerId: string;
  audioRef: HTMLAudioElement | null;
}

import { IPeerIdOnRoomPayload } from '../../../../common/interface/redisInterface';

export function AudioCall({ currentSection }: IAudioProps) {
  const [peerList, setPeerList] = useState<string[]>([]); // État contenant la liste des peerId (chaînes) des utilisateurs connectés.
  const audiosRef = useRef<IAudioRef[]>([]); // Référence pour stocker les références d'éléments audio distants pour chaque peer.
  const peerManagerRef = useRef<boolean>(false); // Variable pour gérer si un peer a été ajouté récemment (pour éviter des doublons ou des erreurs de gestion de peers).
  const name = 'Théo'; //TODO Recuperer le nom avec le context

  useEffect(() => {
    // Charger la liste des peerId à partir du backend (Redis) et la stocker dans le state peerList.
    loadPeerList(currentSection).then((result) => {
      // Je retire mon peerId si il est déjà présent dans le resultat
      const list = result.filter(
        (row) => row.split(':')[0].trim() !== peerService.peerId
      );
      setPeerList(list);
    });

    // Si le peerId est défini, envoie un événement au serveur via socket.io pour indiquer que cet utilisateur rejoint la channel (salle) spécifiée.
    if (peerService.peerId) {
      webSocketService.emit('join-room', {
        peerId: peerService.peerId,
        roomUuid: currentSection.uuid,
        name: name,
      });
    }

    // Quand un nouvel utilisateur rejoint la salle, on l'ajoute à la peerList.
    const joinChannel = (data: IPeerIdOnRoomPayload) => {
      // TODO : Ajouter une vérification pour éviter d'ajouter son propre peerId à la liste.
      peerManagerRef.current = true; // Marque qu'un nouveau peer a été ajouté.
      setPeerList((prevState) => [...prevState, data.peerId]); // Ajoute le peerId reçu à la liste des peers.
    };

    // Quand un utilisateur quitte la salle, on le retire de la peerList.
    const leaveChannel = (data: IPeerIdOnRoomPayload) => {
      setPeerList(
        (prevState) => prevState.filter((peerId) => peerId !== data.peerId) // Filtre et supprime le peerId de l'utilisateur qui a quitté.
      );
    };

    // Écoute les événements "join-channel" et "leave-channel" envoyés par le serveur pour gérer l'ajout et la suppression des peers dans la salle.
    webSocketService.on('leave-room', leaveChannel);
    webSocketService.on('join-room', joinChannel);

    // Cleanup lors du démontage du composant (comme quand l'utilisateur quitte la section) :
    return () => {
      webSocketService.off('join-room', joinChannel);
      webSocketService.emit('leave-room', {
        peerId: peerService.peerId,
        roomUuid: currentSection.uuid,
        name: name,
      });
      peerService.closeCalls(); // Ferme toutes les connexions PeerJS en cours.
    };
  }, [currentSection]);

  useEffect(() => {
    // Gère l'ajout de nouveaux peers après que la liste des peers a été mise à jour.
    if (peerManagerRef.current === false) {
      // Si aucun peer n'a été ajouté récemment (cas initial ou mise à jour générale de la peerList) :
      for (let obj of audiosRef.current) {
        peerService.addNewPeer(obj.peerId, obj.audioRef!); // Ajoute chaque peer de la liste actuelle avec son élément audio.
      }
    } else {
      // Si un peer a été ajouté récemment (optimisation pour éviter de tout re-parcourir) :
      const obj = audiosRef.current[audiosRef.current.length - 1]; // Récupère le dernier peer ajouté.
      peerService.addNewPeer(obj.peerId, obj.audioRef!); // Ajoute ce peer spécifique.
      peerManagerRef.current = false; // Réinitialise la variable pour la prochaine mise à jour.
    }
    console.log('peerList : ', peerList);
  }, [peerList]); // useEffect se déclenche à chaque fois que peerList change.

  return (
    <>
      {peerList.map((peerId, index) => (
        <div key={index}>
          <audio
            ref={
              (audioRef) => (audiosRef.current[index] = { audioRef, peerId }) // Associe chaque peerId à son élément audio correspondant.
            }
            autoPlay // L'audio démarre automatiquement quand il est reçu.
          />
        </div>
      ))}
    </>
  );
}
