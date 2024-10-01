import axios from "axios";
import Cookies from "js-cookie";

// TODO: mettre l'API_URL dans le .env après
const API_URL = "http://localhost:3000";

export const login = async (email: string, password: string) => {
  const response = await axios.post(
    `${API_URL}/login`,
    { email, password },
    { withCredentials: true }
  );
  if (response.data.token) {
  }
  return response.data;
};

export const register = async (
  name: string,
  firstName: string,
  email: string,
  password: string
) => {
  const response = await axios.post(
    `${API_URL}/register`,
    { name, firstName, email, password },
    { withCredentials: true }
  );
  return response.data;
};

export const logout = async () => {

  await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });

  Cookies.remove("token");
};