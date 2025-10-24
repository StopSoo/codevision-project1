import axios from "axios";
import auth from "./auth";
import { useLogoutModalStore } from "@/store/store";

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
            const { setIsModalOpen } = useLogoutModalStore();

            localStorage.removeItem('accessToken');
            setIsModalOpen();
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
)

export const AuthAPI = auth(axiosInstance);