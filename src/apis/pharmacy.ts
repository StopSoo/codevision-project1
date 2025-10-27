import { AxiosError } from "axios";
import { AuthAPI } from "./axiosInstance";
// 오늘의 주문
export const getTodaysOrderList = async ({ date, scope = 'DAY' }: {
    date: string;
    scope?: 'DAY' | 'WEEK' | 'MONTH' | 'DOW';
}) => {
    try {
        const response = await AuthAPI.viewTodaysOrder(
            date,
            {
                params: scope ? { scope } : { scope: 'DAY' }
            }
        );
        return response.data ?? { items: [] };
    } catch (error) {
        const err = error as AxiosError;
        console.log('getTodayOrderList error', err);
        return { items: [] };
    }
};
// 요즘 약국 랭킹 
export const getTodaysRanking = async () => {
    try {
        const response = await AuthAPI.viewMedRanking();
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        console.log('getTodaysRanking error', err);
        return null;
    }
};
// 약품 담기
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