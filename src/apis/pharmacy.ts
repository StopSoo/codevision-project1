import { AxiosError } from "axios";
import { AuthAPI } from "./axiosInstance";
// 오늘의 주문
export const getTodaysOrderList = async ({ date, scope = 'DAY' }: {
    date: string;
    scope?: 'DAY' | 'WEEK' | 'MONTH' | 'DOW';
}) => {
    try {
        const response = await AuthAPI.viewTodaysOrder(
            date, scope
        );
        return response.data ?? { items: [] };
    } catch (error) {
        const err = error as AxiosError;
        console.log('getTodayOrderList error', err);
        return { items: [] };
    }
};
// 요즘 약국 랭킹 
export const getTodaysRanking = async (
    qty?: number, percent?: number
) => {
    try {
        const response = await AuthAPI.viewMedRanking(qty, percent);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.log('getTodaysRanking error', err);
        return null;
    }
};
// 약품 담기 - 약품 정보
export const getMedicineDetail = async (id: number) => {
    try {
        const response = await AuthAPI.viewMedicineDetail(id);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.log('getMedicineDetail error', err);
        return null;
    }
};
// 약품 담기 - 도매상 정보
export const getWholesaleDetail = async (id: number) => {
    try {
        const response = await AuthAPI.viewWholesaleDetail(id);
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.log('getWholesaleDetail error', err);
        return null;
    }
};