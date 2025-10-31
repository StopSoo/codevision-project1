/* 약국 - 장바구니 */
export type CartItem = {
    cartItemId: number;
    medicineId: number;
    medicineName: string;
    standard: string;
    unit: string;
    unitPrice: number;
    quantity: number;
    itemTotalPrice: number;
    wholesaleName: string;
    wholesaleId: number;
}

export type CartStore = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (cartItemId: number) => void;
    updateQuantity: (cartItemId: number, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    isAbleToAdd: (item: CartItem, maxQuantity: number) => boolean;
}

/* 장바구니 API */
export interface CartItemApi {
    cartItemId: number;
    medicineId: number;
    wholesaleId: number;
    quantity: number;
    unitPrice: number;
    itemTotalPrice: number;
}

// 장바구니 담기
export interface AddCartReq {
    medicineId: number;
    wholesaleId: number;
    quantity: number;
}

export interface AddCartRes {
    data: CartItemApi;
}

// 장바구니 부분 취소 & 수량 변경
export interface EmptyCartRes {
    data: Record<string, never>;
}

// 장바구니 수량 변경
export interface EditCartReq {
    quantity: number;
}

// 장바구니 전체 조회
export interface CartDetailItem {
    medicineName: string;
    standard: string;
    unit: string;
    unitPrice: number;
    quantity: number;
    itemTotalPrice: number;
    wholesaleName: string;
}

export interface TotalCartRes {
    data: {
        items: CartItem[];
        totalQuantity: number;
        totalPrice: number;
    }
}
