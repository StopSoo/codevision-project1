/* 도매상 - 주문 예상 품목 */
export type PredictMedicineType = {
    name: string;
    quantity: number;
    price: number;
    date: string;
}

export type PredictItemStore = {
    result: PredictMedicineType[];
    setResult: (newResult: PredictMedicineType[]) => void;
}