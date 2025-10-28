import { DataType } from './medicine';
import { CartDetailItem } from '../cart/cart';
import { MedicineDetailData } from './medicine';
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
    result: RankingItem[]; // 분석 결과 리스트
    setResult: (newResult: RankingItem[]) => void;
}

/* 약국 주문 API */
// 오늘의 주문
interface AnalysisItem {
    medicineId: number;
    productName: string;
    standard: string;
    unitQty: number;
    innerUnit: string;
    containerUnit: string;
    insuranceCode: string;
    productCompany: string;
    expectedQty: number;
    probOrder: number;
    score: number;
}

export interface TodaysRes {
    data: {
        items: AnalysisItem[];
    }
}

// 요즘 약국 랭킹 분석
interface RankingItem {
    medicineId: number;
    productName: string;
    standard: string;
    unitQty: number;
    innerUnit: string;
    containerUnit: string;
    insuranceCode: string;
    productCompany: string;
    orderRate: number;
}

export interface RankingRes {
    data: {
        items: RankingItem[];
    }
}

// 약품 담기 - 약품 정보
export interface MedicineDetailRes {
    data: MedicineDetailData;
}

// 약품 담기 - 도매상 정보
interface WholesaleItem {
    medicineId: number;
    wholesaleId: number;
    wholesaleName: string;
    unitPrice: number;
    point: number;
    expectedStockQty: number;
}

export interface WholesaleDetailRes {
    data: WholesaleItem[];
}

// 주문 목록 조회
interface ViewOrderListApi {
    orderId: number;
    orderNumber: string;
    orderTotalPrice: number;
}

export interface ViewOrderListRes {
    isSuccess: boolean;
    code: number;
    message: string;
    result: ViewOrderListApi;
}
// 주문하기
interface PharmacyOrderApi {
    orderId: number;
    orderNumber: string;
    totalPrice: number;
    totalQuantity: number;
}

export interface PharmacyOrderRes {
    isSuccess: boolean;
    code: number;
    message: string;
    result: PharmacyOrderApi;
}
// 주문 내역 조회
interface ViewOrderDetailApi {
    orderNumber: string;
    items: CartDetailItem[];
    totalQuantity: number;
    totalPrice: number;
}

export interface ViewOrderDetailRes {
    isSuccess: boolean;
    code: number;
    message: string;
    result: ViewOrderDetailApi;
}