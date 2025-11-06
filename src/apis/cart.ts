import { AddCartReq, EditCartReq } from "@/types/cart/cart";
import { AuthAPI } from "./axiosInstance";
import { AxiosError } from "axios";
// 장바구니 담기
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
        if (err && err.response?.status === 400) {
            throw new Error('QUANTITY_EXCEEDED');
        }
    }
}
// 장바구니 수정(수량 변경)
export const patchEditCart = async (
    cartItemId: number, data: EditCartReq
) => {
    const numValue = data.quantity || 0;
    try {
        if (numValue > 0) {
            const response = await AuthAPI.editQuantity(
                cartItemId,
                {
                    quantity: numValue
                }
            );
            return response;
        }
    } catch (error) {
        const err = error as AxiosError;
        if (err && err.response?.status === 400) {
            throw new Error('QUANTITY_EXCEEDED');
        }
    }
};
// 장바구니 부분 취소
export const deleteCartItem = async (
    cartItemId: number
) => {
    try {
        const response = await AuthAPI.cancelCart(cartItemId);
        // 빈 객체일 경우
        if (Object.keys(response).length === 0) {
            return response;
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error("deleteCartItem error", err);
    }
};
// 장바구니 전체 취소
export const deleteAllCart = async (
    wholesaleId?: number
) => {
    try {
        const response = await AuthAPI.cancelAllCart(wholesaleId);
        // 빈 객체일 경우
        if (Object.keys(response).length === 0) {
            return response;
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error("deleteAllCart error", err);
    }
};
// 장바구니 전체 조회
export const getAllCarts = async () => {
    try {
        const response = await AuthAPI.viewAllCart();
        if ("data" in response) {
            return response.data;
        } else {
            return {
                items: [],
                totalQuantity: 0,
                totalPrice: 0,
            };
        }
    } catch (error) {
        const err = error as AxiosError;
        console.error("getAllCarts error", err);
        if (err.response?.status === 404) {
            // 장바구니가 없는 경우
            return {
                items: [],
                totalQuantity: 0,
                totalPrice: 0,
            };
        } else if (err.response?.status === 401) {
            // access token 만료 시
            console.log("401 error in getAllCarts");
        }
        throw err;
    }
}