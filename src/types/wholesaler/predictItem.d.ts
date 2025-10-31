/* 도매상 */
// 주문 예상 품목
export type PredictMedicineType = {
    predictId: number;
    medicineId: number;
    productName: string;
    unitQty: number;
    innerUnit: string;
    expectedQty: number;
    totalPrice: number;
    avgProbOrder: number;
    expectedOrderDate: string;
}

export type PredictItemStore = {
    result: PredictMedicineType[];
    setResult: (newResult: PredictMedicineType[]) => void;
    updateQuantity: (id: number, quantity: number) => void;
    updateTotalPrice: (id: number, totalPrice: number) => void;
}

export type OrderItemStore = {
    orderedList: WholesaleOrder[];
    addToOrderedList: (item: WholesaleOrder) => void;
    clearOrderedList: () => void;
    getTotalPrice: () => number;
}
// 도매상 - 주문 예상 약국
export type PredictPharmacyType = {
    pharmacyId: number;
    pharmacyName: string; // 약국명
    expectedQty: number; // 수량
    probOrder: number; // 주문 확률
}

export type PredictPharmacyStore = {
    medInfoList: PredictPharmacyType[];
    setMedInfoList: (newList: PredictPharmacyType[]) => void;
    getTotalQuantity: () => number;
}
// 도매상 - 약국 회원 선택
export type PharmacyMemberType = {
    name: string;
    country: string;
    signUpDate: string;
}

export type PharmacyMemberStore = {
    result: PharmacyMemberType[];
    setResult: (newResult: PharmacyMemberType[]) => void;
}

/* 도매상 API */
// 주문 예상 품목 조회
export type PredictOrderRes = {
    data: [{
        items: PredictMedicineType[];
    }];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
}
// 주문 예상 품목 상세 조회
export type PredictPharmacyListType = {
    medicineId: number;
    productName: string;
    unitQty: number;
    innerUnit: string;
    containerUnit: string;
    totalExpectedQty: number;
    pharmacyList: PredictPharmacyType[];
}

export type PredictOrderDetailRes = {
    data: PredictPharmacyListType;
}
// 주문 목록 조회
export type WholesaleOrder = {
    orderId: number;
    pharmacyName: string;
    orderNumber: string;
    wholesaleTotalPrice: number;
    wholesaleTotalQuantity: number;
    orderDateTime: string;
}

export type WholesaleOrderRes = {
    data: WholesaleOrder[];
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
}
// 주문 내역 조회
export type WholesaleOrderItem = {
    medicineName: string;
    standard: string;
    unit: string;
    unitPrice: number;
    quantity: number;
    itemTotalPrice: number;
}

export type WholesaleOrderItemRes = {
    data: {
        orderNumber: string;
        pharmacyId: number;
        items: WholesaleOrderItem[];
        totalQuantity: number;
        totalPrice: number;
        orderDateTime: string;
    }
}