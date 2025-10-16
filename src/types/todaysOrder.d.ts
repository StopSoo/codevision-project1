import { DataType } from '@/components/order/AnalysisList';

export type AnalysisStore = {
    clickAnalysis: boolean; // [오늘의 주문] 버튼 클릭 여부
    setClickAnalysis: () => void;
    result: DataType[]; // AI 분석 결과 리스트
    setResult: (newResult: DataType[]) => void;
}

export type SelectedMedStore = {
    selectedMedNumber: number | null; // 선택한 약품의 인덱스 번호 or 약품 번호
    setSelectedMedNumber: (index: number | null) => void;
}