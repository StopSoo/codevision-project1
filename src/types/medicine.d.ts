/* 약국 - AI 분석 결과 */
export type DataType = {
    name: string;
    company: string;
    code: string;
    detail?: [string, number][];
    percentage?: string;
}
// 약품 선택
export type SelectedMedStore = {
    selectedMedNumber: number | null; // 선택한 약품의 인덱스 번호 or 약품 번호
    setSelectedMedNumber: (index: number | null) => void;
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