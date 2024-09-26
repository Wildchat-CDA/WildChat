import axios from "axios";
import { sanitizeString, sanitizeEmail } from "../utils/sanitize";

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

interface UserData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  user: {
    id: string;
    nom: string;
    prenom: string;
    email: string;
  };
  token: string;
}

export async function register(userData: UserData): Promise<AuthResponse> {
  const sanitizedData = {
    nom: sanitizeString(userData.nom),
    prenom: sanitizeString(userData.prenom),
    email: sanitizeEmail(userData.email),
    password: userData.password, // Nous ne sanitisons pas le mot de passe
  };
  const response = await api.post<AuthResponse>(
    "/auth/register",
    sanitizedData
  );
  return response.data;
}

export async function login(
  credentials: LoginCredentials
): Promise<AuthResponse> {
  const sanitizedCredentials = {
    email: sanitizeEmail(credentials.email),
    password: credentials.password, // Nous ne sanitisons pas le mot de passe
  };
  const response = await api.post<AuthResponse>(
    "/auth/login",
    sanitizedCredentials
  );
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post("/auth/logout");
  localStorage.removeItem("token");
}

export async function checkEmailExists(email: string): Promise<boolean> {
  const sanitizedEmail = sanitizeEmail(email);
  const response = await api.post<{ exists: boolean }>("/auth/check-email", {
    email: sanitizedEmail,
  });
  return response.data.exists;
}

export function setAuthToken(token: string): void {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  localStorage.setItem("token", token);
}

export function getAuthToken(): string | null {
  return localStorage.getItem("token");
}

export function clearAuthToken(): void {
  delete api.defaults.headers.common["Authorization"];
  localStorage.removeItem("token");
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
