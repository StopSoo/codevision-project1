import { AxiosError } from "axios";
import { AuthAPI } from "./axiosInstance";

export const getMyPage = async () => {
    try {
        const response = await AuthAPI.viewMyPage();

        if ("data" in response) {
            return response.data;
        } else {
            return null;
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error("getMyPage error", err);
        return null;
    }
};