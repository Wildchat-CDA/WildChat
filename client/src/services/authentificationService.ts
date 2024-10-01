import axios from "axios";
import Cookies from "js-cookie";

// TODO: mettre l'API_URL dans le .env après
const API_URL = "http://localhost:3000";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      { withCredentials: true }
    );
    
    
    if (response.data.token) {
      Cookies.set('token', response.data.token, { secure: true, sameSite: 'strict' });
    }
    
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
    throw error;
  }
};

export const register = async (
  name: string,
  firstName: string,
  email: string,
  password: string
) => {
  try {
    const response = await axios.post(
      `${API_URL}/register`,
      { name, firstName, email, password },
      { withCredentials: true }
    );

    if (response.data.token) {
      Cookies.set('token', response.data.token, { secure: true, sameSite: 'strict' });
    }
    
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Erreur lors de la déconnexion côté serveur:", error);
  } finally {
    Cookies.remove("token");
  }
};
export const isAuthenticated = () => {
  return !!Cookies.get('token');
};