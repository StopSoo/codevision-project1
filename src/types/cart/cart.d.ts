/* 약국 - 장바구니 */
export type CartItem = {
    id: string;
    name: string;
    dosage: string;
    unit: string;
    price: number;
    quantity: number;
    wholesaler: string;
    manufacturer: string;
    code: string;
    available: number;
}

export type CartStore = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    isAbleToAdd: (item: CartItem) => boolean;
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

export interface CartRes {
    isSuccess: boolean;
    code: number;
    message: string;
    result: CartItemApi;
}

// 장바구니 수량 변경
export interface EditCartReq {
    quantity: number;
}

// 장바구니 전체 조회
export interface CartDetailItem {
    medicineName: string;
    detailName: string;
    unit: string;
    unitPrice: number;
    quantity: number;
    itemTotalPrice: number;
    wholesaleName: string;
}

export interface TotalCartRes {
    isSuccess: boolean;
    code: number;
    message: string;
    result: {
        items: CartDetailItem[];
        totalQuantity: number;
        totalPrice: number;
    }
}
