export const ADD_PEER = "ADD_PEER" as const;
export const REMOVE_PEER = "REMOVE_PEER" as const;
export const ADD_ALL_PEERS = "ADD_ALL_PEERS" as const;

export interface IPeer {
  userName: string;
  peerId: string;
}

export const addPeerAction = (peerId: string, stream: MediaStream) => ({
  type: ADD_PEER,
  payload: { peerId, stream },
});

export const addAllPeersAction = (participants: Record<string, IPeer>) => ({
  type: ADD_ALL_PEERS,
  payload: { participants },
});

export const removePeerAction = (peerId: string) => ({
  type: REMOVE_PEER,
  payload: { peerId },
});

export type PeerState = Record<string, { stream: MediaStream }>;

type PeerAction =
  | {
      type: typeof ADD_PEER;
      payload: { peerId: string; stream: MediaStream };
    }
  | {
      type: typeof REMOVE_PEER;
      payload: { peerId: string };
    }
  | {
      type: typeof ADD_ALL_PEERS;
      payload: { participants: Record<string, IPeer> };
    };

export const peerReducer = (state: PeerState, action: PeerAction): PeerState => {
  switch (action.type) {
    case ADD_PEER:
      return {
        ...state,
        [action.payload.peerId]: {
          stream: action.payload.stream, 
        },
      };
    case REMOVE_PEER:
      const { [action.payload.peerId]: deleted, ...rest } = state;
      return rest;
    case ADD_ALL_PEERS:
      return {
        ...state,
        ...Object.fromEntries(
          Object.entries(action.payload.participants).map(([peerId, peer]) => [
            peerId,
            { stream: new MediaStream() },
          ])
        ),
      };
    default:
      return state;
  }
};
