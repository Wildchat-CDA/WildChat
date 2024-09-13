export interface User {
  uuid: string;
  peerID: string;
}

export interface ChannelInfo {
  channelUUID: string;
  users: User[];
}

export interface JoinChannelResponse {
  uuid: string;
  channelUUID: string;
}
