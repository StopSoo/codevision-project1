import { AxiosError } from "axios";
import { AuthAPI } from "./axiosInstance";
// 도매상 - 주문 목록 조회
export const getWholesaleOrders = async (
    startDate?: string, endDate?: string, page?: number, size?: number
) => {
    try {
        const response = await AuthAPI.viewWholesaleOrderLog(
            startDate, endDate, page, size
        );
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.log('getWholesaleOrders error', err);
    }
};
// 도매상 - 주문 내역 조회
export const getWholesaleOrderDetail = async (
    orderId: number
) => {
    try {
        const response = await AuthAPI.viewWholesaleOrderLogDetail(
            orderId
        );
        return response;
    } catch (error) {
        const err = error as AxiosError;
        console.log('getWholesaleOrderDetail error', err);
    }
};