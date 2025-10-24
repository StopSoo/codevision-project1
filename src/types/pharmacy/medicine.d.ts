/* 약국 - AI 분석 결과 */
export type DataType = {
    sort?: string;
    medicineId: number;
    productName: string;
    standard: string;   // 단위 (ex> 50)
    unitQty: number;  // 단위 수량
    innerUnit: string; // 내부 단위
    containerUnit: string; // 외부 포장 단위
    insuranceCode: string;
    productCompany: string; // 제조사
    expectedQty: number; // 예상 주문 수량
    probOrder: number; // 주문 확률
    score: number; // 추천 확률
}
// 약품 or 약국 회원 선택
export type SelectedStore = {
    selectedNumber: number | null; // 선택한 약품/회원의 인덱스 번호 or 약품 번호
    setSelectedNumber: (index: number | null) => void;
}

/* 약국 - 약품 담기 */
export type MedicineVariant = {
    name: string;
    price: number;
    margin: string;
    available: number;
};

export type MedicineDetailData = {
    name: string;
    unit: string;
    dosage: string;
    manufacturer: string;
    code: string;
    variants: MedicineVariant[];
};