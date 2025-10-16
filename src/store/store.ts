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
}));



/* 도매상 */