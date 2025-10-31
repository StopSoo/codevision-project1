import { AxiosError } from "axios";
import { AuthAPI } from "./axiosInstance";
// 주문하기
export const postPharmacyOrder = async () => {
    try {
        const response = await AuthAPI.orderPharmacy();

        if ("data" in response) {
            return response.data;
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error("postPharmacyOrder error", err);
    }
};
// 주문 내역 - 목록 조회
export const getPharmacyOrderHistory = async (
    startDate?: string, endDate?: string, page?: number, size?: number, search?: string
) => {
    try {
        const response = await AuthAPI.viewPharmacyOrderHistory(
            startDate, endDate, page, size, search
        );

        if ("data" in response) {
            return response;
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error("getPharmacyOrderHistory error", err);
    }
};
// 주문 내역 - 상세 조회
export const getPharmacyOrderHistoryDetail = async (orderId: number) => {
    try {
        const response = await AuthAPI.viewPharmacyOrderDetail(orderId);

        if ("data" in response) {
            return response.data;
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error("getPharmacyOrderHistory error", err);
    }
};