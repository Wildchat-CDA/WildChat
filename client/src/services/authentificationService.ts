<<<<<<< HEAD
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
import { jwtDecode } from 'jwt-decode';
import { Role } from '../../../server/src/entity/role.entity';

// TODO: mettre l'API_URL dans le .env après
const API_URL = 'http://localhost:3000';
=======
import axios from "axios";
import Cookies from "js-cookie";

// TODO: mettre l'API_URL dans le .env après
const API_URL = "http://localhost:3000";
>>>>>>> dev

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      { withCredentials: true }
    );
<<<<<<< HEAD

    if (response.data.accessToken) {
      console.log(response, 'response authentification service');
     /* Cookies.set('token', response.data.accessToken, {
        secure: true,
        sameSite: 'strict',
      });*/

      const cookie = {
        encoded: response.data.accessToken,
        userInfo: {
          email: response.data.email,
          name: response.data.name,
          role: response.data.role,
          id: response.data.id,
        },
      };

      console.log(cookie, 'COOKIE');

      Cookies.set('token', JSON.stringify(cookie), {
        secure: true,
        sameSite: 'strict',
      });
//      Cookies.set('user', response.data.id);
    }

    return response.data;
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
=======
    
    
    if (response.data.token) {
      Cookies.set('token', response.data.token, { secure: true, sameSite: 'strict' });
    }
    
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la connexion:", error);
>>>>>>> dev
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
   
  }
};
export const isAuthenticated = () => {
  return !!Cookies.get('token');
};

