import { DataType } from '@/components/order/AnalysisList';
import { create } from 'zustand';
/* 약국 */
// 오늘의 주문
interface AnalysisStore {
    clickAnalysis: boolean; // [오늘의 주문] 버튼 클릭 여부
    setClickAnalysis: () => void;
    result: DataType[]; // AI 분석 결과 리스트
    setResult: (newResult: DataType[]) => void;
}

export const useAnalysisStore = create<AnalysisStore>((set) => ({
    clickAnalysis: false,
    setClickAnalysis: () => set((state) => ({ clickAnalysis: !state.clickAnalysis })),
    result: [],
    setResult: (newResult: DataType[]) => set({ result: newResult })
}))

// 약품 선택
interface SelectedMedStore {
    selectedMedNumber: number | null; // 선택한 약품의 인덱스 번호 or 약품 번호
    setSelectedMedNumber: (index: number) => void;
}

export const useSelectedMedStore = create<SelectedMedStore>((set) => ({
    selectedMedNumber: null,
    setSelectedMedNumber: (index: number) => set({ selectedMedNumber: index }),
}))

/* 도매상 */