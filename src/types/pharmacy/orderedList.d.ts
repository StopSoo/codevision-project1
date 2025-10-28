/* 약국 - 주문 내역 */
// 주문 목록 조회에도 사용
export type OrderedItem = {
    orderId: number;
    orderNumber: string;
    orderTotalPrice: number;
    orderDate: string;
}

export type OrderedListStore = {
    orderedList: OrderedItem[];
    addToOrderedList: (item: CartItem) => void;
    getTotalPrice: () => number;
}


/* 약국 - 주문 API */
// 주문하기
interface OrderItem {
    orderId: number;
    orderNumber: string;
    totalPrice: number;
    totalQuantity: number;
}

export interface PharmacyOrderRes {
    data: OrderItem;
}

// 주문 목록 조회
export interface ViewPharmacyOrderRes {
    data: OrderedItem[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
}

// 주문 내역 조회
interface ViewOrderDetailApi {
    orderNumber: string;
    items: CartDetailItem[];
    totalQuantity: number;
    totalPrice: number;
}

export interface ViewOrderDetailRes {
    isSuccess: boolean;
    code: number;
    message: string;
    result: ViewOrderDetailApi;
}