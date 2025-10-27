import { AddCartReq, AddCartRes, EditCartReq, EmptyCartRes, TotalCartRes } from "@/types/cart/cart";
import { LoginReq, LoginRes } from "@/types/login/login";
import { MedicineDetailRes, PharmacyOrderRes, RankingRes, TodaysRes, ViewOrderDetailRes } from "@/types/pharmacy/order";
import { SignupReq, SignupRes } from "@/types/signup/signup";
import { AxiosInstance } from "axios";

const auth = (axiosInstance: AxiosInstance) => ({
    signup: async (data: SignupReq): Promise<SignupRes> => {
        const response = await axiosInstance.post<SignupRes>(
            '/auth/signup',
            data
        );
        return response.data;
    },

    login: async (data: LoginReq): Promise<LoginRes> => {
        const response = await axiosInstance.post<LoginRes>(
            '/auth/login',
            data
        );
        if (response.data) {
            console.log("accesstoken 저장 성공");
            localStorage.setItem('accessToken', response.data.data.accessToken);
        } else {
            console.log("accesstoken 저장 실패");
        }
        return response.data;
    },

    // logout: async (): Promise<void> => {
    //     localStorage.removeItem('accessToken');
    //     // await axiosInstance.post('/auth/logout');
    // },

    addCart: async (item: AddCartReq): Promise<AddCartRes> => {
        const response = await axiosInstance.post<AddCartRes>(
            '/carts/items',
            item
        );
        return response.data;
    },

    cancelCart: async (cartItemId: number): Promise<EmptyCartRes> => {
        const response = await axiosInstance.delete<EmptyCartRes>(
            `/carts/items/${cartItemId}`
        );
        return response.data;
    },

    editQuantity: async (cartItemId: number, quantity: EditCartReq): Promise<EmptyCartRes> => {
        const response = await axiosInstance.patch<EmptyCartRes>(
            `/carts/items/${cartItemId}`,
            quantity
        );
        return response.data;
    },

    viewAllCart: async (): Promise<TotalCartRes> => {
        const response = await axiosInstance.get<TotalCartRes>(
            '/carts'
        );
        return response.data;
    },

    viewPharmacyOrderHistory: async (
        startDate?: string, endDate?: string
    ): Promise<PharmacyOrderRes> => {
        const response = await axiosInstance.get<PharmacyOrderRes>(
            `/pharmacy/orders?startDate=${startDate}&endDate=${endDate}`
        );
        return response.data;
    },

    viewPharmacyOrderDetail: async (orderId: number): Promise<ViewOrderDetailRes> => {
        const response = await axiosInstance.get<ViewOrderDetailRes>(`/pharmacy/orders/${orderId}`);
        return response.data;
    },

    viewTodaysOrder: async (
        date: string,
        scope?: string
    ): Promise<TodaysRes> => {
        const response = await axiosInstance.get<TodaysRes>(
            `/pharmacy/today-order/${date}?scope=${scope}`,
        );
        return response.data;
    },

    viewMedRanking: async (): Promise<RankingRes> => {
        const response = await axiosInstance.get<RankingRes>(
            '/pharmacy/today-ranking'
        );
        return response.data;
    },

    viewMedicineDetail: async (
        id: number,
    ): Promise<MedicineDetailRes> => {
        const response = await axiosInstance.get<MedicineDetailRes>(
            `/medicine/${id}`,
            {
                params: { id }
            }
        );
        return response.data;
    },


});

export default auth;