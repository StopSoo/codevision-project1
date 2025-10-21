import { DataType } from '@/components/order/AnalysisList';

export type DataStore = {
    click: boolean; // 버튼 클릭 여부
    setButtonOn: () => void;
    setButtonOff: () => void;
    result: DataType[]; // AI 분석 결과 리스트
    setResult: (newResult: DataType[]) => void;
}