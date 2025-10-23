import { DataType } from '@/components/order/AnalysisList';
/* 약국 - 오늘의 주문 */
export type TodaysOrderStore = {
    click: boolean; // 버튼 클릭 여부
    setButtonOn: () => void;
    setButtonOff: () => void;
    result: DataType[]; // 분석 결과 리스트
    setResult: (newResult: DataType[]) => void;
    // 오늘의 주문 필터링
    filterList: string[];
    setFilterList: (filterName: string) => void;
}
/* 약국 - 요즘 약국 랭킹 */
export type PharmacyRankingStore = {
    click: boolean; // 버튼 클릭 여부
    setButtonOn: () => void;
    setButtonOff: () => void;
    result: DataType[]; // 분석 결과 리스트
    setResult: (newResult: DataType[]) => void;
}