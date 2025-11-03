import { AddCartReq, AddCartRes, EditCartReq, EmptyCartRes, TotalCartRes } from "@/types/cart/cart";
import { LoginReq, LoginRes } from "@/types/login/login";
import { MyPageRes } from "@/types/member/member";
import { MedicineDetailRes, RankingRes, TodaysRes, WholesaleDetailRes } from "@/types/pharmacy/order";
import { PharmacyOrderRes, ViewOrderDetailRes, ViewPharmacyOrderRes } from "@/types/pharmacy/orderedList";
import { CheckEmailReq, CheckEmailRes, SignupReq, SignupRes } from "@/types/signup/signup";
import { PredictOrderDetailRes, PredictOrderRes, WholesaleOrderItemRes, WholesaleOrderRes } from "@/types/wholesaler/predictItem";
import { AxiosInstance } from "axios";

const auth = (axiosInstance: AxiosInstance) => ({
    // 회원가입
    signup: async (data: SignupReq): Promise<SignupRes> => {
        const response = await axiosInstance.post<SignupRes>(
            '/auth/signup',
            data
        );
        return response.data;
    },
    // 로그인
    login: async (data: LoginReq): Promise<LoginRes> => {
        const response = await axiosInstance.post<LoginRes>(
            '/auth/login',
            data
        );
        if (response.data) {
            console.log("accesstoken 저장 성공");
            localStorage.setItem('accessToken', response.data.data.accessToken);
        } else {
            console.log("accesstoken 저장 실패");
        }
        return response.data;
    },
    // 이메일 중복 검사
    checkEmailExist: async (data: CheckEmailReq): Promise<CheckEmailRes> => {
        const response = await axiosInstance.get<CheckEmailRes>(
            '/auth/check-email',
            {
                params: data
            }
        );
        return response.data;
    },
    // 마이 페이지
    viewMyPage: async (): Promise<MyPageRes> => {
        const response = await axiosInstance.get<MyPageRes>(
            '/mypage'
        );
        return response.data;
    },
    // 장바구니 담기
    addCart: async (item: AddCartReq): Promise<AddCartRes> => {
        const response = await axiosInstance.post<AddCartRes>(
            '/carts/items',
            item
        );
        return response.data;
    },
    // 장바구니 부분 취소
    cancelCart: async (cartItemId: number): Promise<EmptyCartRes> => {
        const response = await axiosInstance.delete<EmptyCartRes>(
            `/carts/items/${cartItemId}`
        );
        return response.data;
    },
    // 장바구니 수량 변경
    editQuantity: async (
        cartItemId: number, data: EditCartReq
    ): Promise<EmptyCartRes> => {
        const response = await axiosInstance.patch<EmptyCartRes>(
            `/carts/items/${cartItemId}`,
            data
        );
        return response.data;
    },
    // 장바구니 조회
    viewAllCart: async (): Promise<TotalCartRes> => {
        const response = await axiosInstance.get<TotalCartRes>(
            '/carts'
        );
        return response.data;
    },
    // 장바구니 전체 취소
    cancelAllCart: async (wholesaleId?: number): Promise<EmptyCartRes> => {
        const response = await axiosInstance.delete<EmptyCartRes>(
            '/carts',
            {
                params: wholesaleId
            }
        );
        return response.data;
    },
    // 주문하기
    orderPharmacy: async (): Promise<PharmacyOrderRes> => {
        const response = await axiosInstance.post<PharmacyOrderRes>(
            '/pharmacy/orders'
        );
        return response.data;
    },
    // 주문 목록 조회
    viewPharmacyOrderHistory: async (
        startDate?: string, endDate?: string, page?: number, size?: number, search?: string
    ): Promise<ViewPharmacyOrderRes> => {
        const response = await axiosInstance.get<ViewPharmacyOrderRes>(
            `/pharmacy/orders`,
            {
                params: {
                    startDate, endDate, page, size, search
                }
            }
        );
        return response.data;
    },
    // 주문 내역 조회
    viewPharmacyOrderDetail: async (orderId: number): Promise<ViewOrderDetailRes> => {
        const response = await axiosInstance.get<ViewOrderDetailRes>(
            `/pharmacy/orders/${orderId}`
        );
        return response.data;
    },
    // 오늘의 주문 분석 결과
    viewTodaysOrder: async (
        date: string,
        scope?: string
    ): Promise<TodaysRes> => {
        const response = await axiosInstance.get<TodaysRes>(
            `/pharmacy/today-order/${date}?scope=${scope}`,
        );
        return response.data;
    },
    // 주변약국 주문 약품 순위
    viewMedRanking: async (
        qty?: number,
        percent?: number
    ): Promise<RankingRes> => {
        const response = await axiosInstance.get<RankingRes>(
            '/pharmacy/today-ranking',
            {
                params: { qty, percent }
            }
        );
        return response.data;
    },
    // 약 정보 상세 조회
    viewMedicineDetail: async (
        id: number,
    ): Promise<MedicineDetailRes> => {
        const response = await axiosInstance.get<MedicineDetailRes>(
            `/medicine/${id}`,
            {
                params: { id }
            }
        );
        return response.data;
    },
    // 약 판매하는 도매상 리스트 조회
    viewWholesaleDetail: async (
        id: number
    ): Promise<WholesaleDetailRes> => {
        const response = await axiosInstance.get<WholesaleDetailRes>(
            `/medicine/${id}/wholesale-list`,
            {
                params: { id }
            }
        );
        return response.data;
    },
    // 주문 예상 품목 조회
    viewPredictOrder: async (
        page?: number, size?: number
    ): Promise<PredictOrderRes> => {
        const response = await axiosInstance.get<PredictOrderRes>(
            '/wholesale/predict-order',
            {
                params: { page, size }
            }
        );
        return response.data;
    },
    // 주문 예상 품목 상세 조회
    viewPredictOrderDetail: async (predictId: number): Promise<PredictOrderDetailRes> => {
        const response = await axiosInstance.get<PredictOrderDetailRes>(
            `/wholesale/predict-order/${predictId}`,
            {
                params: { predictId }
            }
        );
        return response.data;
    },
    // 도매상 - 주문 목록 조회
    viewWholesaleOrderLog: async (
        startDate?: string, endDate?: string, page?: number, size?: number
    ): Promise<WholesaleOrderRes> => {
        const response = await axiosInstance.get<WholesaleOrderRes>(
            '/wholesale/orders',
            {
                params: { startDate, endDate, page, size }
            }
        );
        return response.data;
    },
    // 도매상 - 주문 내역 조회
    viewWholesaleOrderLogDetail: async (
        orderId: number
    ): Promise<WholesaleOrderItemRes> => {
        const response = await axiosInstance.get<WholesaleOrderItemRes>(
            `/wholesale/orders/${orderId}`,
            {
                params: { orderId }
            }
        );
        return response.data;
    }
});

export default auth;