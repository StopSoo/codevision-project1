/* AI 분석 결과 */
export type DataType = {
    name: string;
    company: string;
    code: string;
    detail?: [string, number][];
    percentage?: string;
}

/* 약품 담기 */
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