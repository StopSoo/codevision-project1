/* 도매상 */
// 주문 예상 품목
export type PredictMedicineType = {
    id: number;
    name: string;
    unitPrice: number;
    quantity: number;
    price: number;
    date: string;
}

export type PredictItemStore = {
    result: PredictMedicineType[];
    setResult: (newResult: PredictMedicineType[]) => void;
    updateQuantity: (id: number, quantity: number) => void;
    updateTotalPrice: (id: number, unitPrice: number, quantity: number) => void;
}

export type OrderItemStore = {
    orderedList: PredictMedicineType[];
    addToOrderedList: (item: PredictMedicineType) => void;
    removeFromOrderedList: (id: number) => void;
    clearOrderedList: () => void;
    getTotalPrice: () => number;
}
// 도매상 - 주문 예상 약국
export type PredictPharmacyType = {
    id: number;
    name: string; // 약국명
    quantity: number; // 수량
    percentage: string; // 주문 확률
}

export type PredictPharmacyStore = {
    medInfoList: PredictPharmacyType[];
    setMedInfoList: (newList: PredictPharmacyType[]) => void;
    getTotalQuantity: () => number;
}