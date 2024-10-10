export interface User {
  status: string;
  id: number;
  name: string;
  firstName: string;
}

export interface PresenceData {
  user: User;
  status: "online" | "offline";
}

export interface PresenceUpdateData {
  userId: number;
  status: "online" | "offline";
}
