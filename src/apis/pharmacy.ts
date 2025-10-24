import { AxiosError } from "axios";
import { AuthAPI } from "./axiosInstance";

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