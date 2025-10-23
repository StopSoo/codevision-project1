import { AddCartReq, CartRes } from "@/types/cart/cart";
import { LoginReq, LoginRes } from "@/types/login/login";
import { PharmacyOrderRes, ViewOrderDetailRes, ViewOrderListApi } from "@/types/pharmacy/order";
import { SignupReq, SignupRes } from "@/types/signup/signup";
import { AxiosInstance } from "axios";

const auth = (axiosInstance: AxiosInstance) => ({
    signup: async (data: SignupReq): Promise<SignupRes> => {
        const response = await axiosInstance.post<SignupRes>('/auth/signup', data);
        return response.data;
    },

    login: async (data: LoginReq): Promise<LoginRes> => {
        const response = await axiosInstance.post<LoginRes>('/auth/login', data);
        if (response.data.result.accessToken) {
            localStorage.setItem('accessToken', response.data.result.accessToken);
        }
        return response.data;
    },

    // logout: async (): Promise<void> => {
    //     localStorage.removeItem('accessToken');
    //     await axiosInstance.post('/auth/logout');
    // }

    addCart: async (item: AddCartReq): Promise<CartRes> => {
        const response = await axiosInstance.post<CartRes>('/carts/items', item);
        return response.data;
    },

    cancelCart: async (cartItemId: number): Promise<CartRes> => {
        const response = await axiosInstance.delete<CartRes>(`/carts/items/${cartItemId}`);
        return response.data;
    },

    editQuantity: async (cartItemId: number, quantity: number): Promise<CartRes> => {
        const response = await axiosInstance.patch<CartRes>(
            `/carts/items/${cartItemId}`,
            { quantity }
        );
        return response.data;
    },

    viewAllCart: async (): Promise<CartRes> => {
        const response = await axiosInstance.get<CartRes>('/carts');
        return response.data;
    },

    viewPharmacyOrderHistory: async (
        startDate?: string, endDate?: string, page?: number, size?: number
    ): Promise<PharmacyOrderRes> => {
        const response = await axiosInstance.get<PharmacyOrderRes>('/pharmacy/orders');
        return response.data;
    },

    viewPharmacyOrderDetail: async (orderId: number): Promise<ViewOrderDetailRes> => {
        const response = await axiosInstance.get<ViewOrderDetailRes>(`/pharmacy/orders/${orderId}`);
        return response.data;
    }
});

export default auth;