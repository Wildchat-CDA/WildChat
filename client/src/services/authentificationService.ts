// import axios from "axios"

// //TODO mettre le API_URL dans le .env apres

// const API_URL= "http://localhost:3000"

// export const login = async (email: string, password: string) => {
//     const response = await axios.post(`${API_URL}/login`, { email, password });
//     console.log(response,"reponse")
//     if (response.data.accessToken) {
//       console.log(response.data.accessToken, 'vérification authentification service');//modification effectuée par sdp
//       localStorage.setItem('user', JSON.stringify(response.data));
//     }
//     return response.data;
// };

// export const register = async (name: string, firstName: string, email: string, password: string) => {
//     const response = await axios.post(`${API_URL}/register`, { name, firstName, email, password });
// }

// export const logout = () => {
//     localStorage.removeItem("user");
// };

import axios from 'axios';
import Cookies from 'js-cookie';

// TODO: mettre l'API_URL dans le .env après
const API_URL = 'http://localhost:3000';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      { withCredentials: true }
    );

      if (response.data.accessToken) {
        console.log(response, 'response authentification service');
        Cookies.set('token', response.data.accessToken, {
          secure: true,
          sameSite: 'strict',
        });
        Cookies.set('user', response.data.id)
      }

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
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

    if (response.data.accessToken) {
      Cookies.set('token', response.data.accessToken, {
        secure: true,
        sameSite: 'strict',
      });
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
    console.error('Erreur lors de la déconnexion côté serveur:', error);
  } finally {
    Cookies.remove('token');
    Cookies.remove('user')
  }
};
export const isAuthenticated = () => {
  return !!Cookies.get('token');
};