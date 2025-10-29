import axios from "axios";
import auth from "./auth";

let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void) => {
    onUnauthorized = handler;
};

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_NEXT_APP_API,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // access token 만료 
            localStorage.removeItem('accessToken');
            if (onUnauthorized) {
                onUnauthorized();
            }
        }
        return Promise.reject(error);
    }
)

export const AuthAPI = auth(axiosInstance);