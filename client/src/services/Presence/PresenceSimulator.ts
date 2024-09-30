import webSocketService from "../webSocketService";

interface User {
  id: number;
  status: "online" | "offline";
  name: string;
  firstName: string;
}

export class PresenceSimulator {
  private users: User[];
  private intervalId: number | null = null;

  constructor(users: User[]) {
    this.users = users;
  }

  start(intervalMs: number = 5000) {
    if (this.intervalId !== null) {
      this.stop();
    }

    this.intervalId = window.setInterval(() => {
      if (this.users.length > 0) {
        const randomUserIndex = Math.floor(Math.random() * this.users.length);
        const randomUser = this.users[randomUserIndex];
        const newStatus: "online" | "offline" =
          randomUser.status === "online" ? "offline" : "online";

        const updatedUser: User = { ...randomUser, status: newStatus };
        this.users[randomUserIndex] = updatedUser;

        webSocketService.emit("presenceUpdate", updatedUser);
      }
    }, intervalMs);
  }

  stop() {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  updateUsers(users: User[]) {
    this.users = users;
  }
}

export const createPresenceSimulator = (users: User[]) =>
  new PresenceSimulator(users);
