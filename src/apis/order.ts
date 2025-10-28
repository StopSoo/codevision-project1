import { AxiosError } from "axios";
import { AuthAPI } from "./axiosInstance";

export const pharmacyOrder = async () => {
    try {
        const response = await AuthAPI.orderPharmacy();

        if ("data" in response) {
            return response.data;
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error("pharmacyOrder error", err);
    }
};