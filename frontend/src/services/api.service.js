import axios from "axios";
import {leerStorage} from "./sessionStorage.service";
export const api = axios.create({baseURL:import.meta.env.VITE_APP_API_URL});
console.log(import.meta.env.VITE_APP_API_URL);

api.interceptors.request.use((config) => {
    const token = leerStorage('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});
