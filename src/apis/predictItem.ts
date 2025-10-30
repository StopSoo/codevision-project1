import { AxiosError } from "axios";
import { AuthAPI } from "./axiosInstance";
// 주문 예상 품목 조회
export const getPredictOrder = async (
    page?: number, size?: number
) => {
    try {
        const response = await AuthAPI.viewPredictOrder(page, size);
        if ("data" in response) {
            return response.data;
        } else {
            return response;
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error("getPredictOrder error", err);
    }
};
// 주문 예상 품목 상세 조회
export const getPredictOrderDetail = async (
    predictId: number
) => {
    try {
        const response = await AuthAPI.viewPredictOrderDetail(predictId);
        if ("data" in response) {
            console.log('성공');
            return response;
        } else {
            console.log('실패');
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error("getPredictOrderDetail error", err);
    }
};