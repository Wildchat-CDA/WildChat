import axios from "axios"

//TODO mettre le API_URL dans le .env apres

const API_URL= "http://localhost:5173/api"

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/login`, {email, password});
    if (response.data.token){
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

export const register = async (name: string, firsName: string, email: string, password: string) => {
    const response = await axios.post(`${API_URL}/register`, { name, firsName, email, password });
}

export const logout = () => {
    localStorage.removeItem("user");
};


