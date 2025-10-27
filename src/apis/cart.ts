import { AddCartReq } from "@/types/cart/cart";
import { AuthAPI } from "./axiosInstance";
import { AxiosError } from "axios";

export const postAddCart = async ({
    medicineId, wholesaleId, quantity
}: AddCartReq) => {
    try {
        const response = await AuthAPI.addCart({
            medicineId, wholesaleId, quantity
        });

        if ("data" in response) {
            return response.data;
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error("postAddCart error", err);
    }
}