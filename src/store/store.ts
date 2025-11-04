import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { CartStore } from '@/types/cart/cart';
import { PharmacyRankingStore, TodaysOrderStore } from '@/types/pharmacy/order';
import { OrderedListStore } from '@/types/pharmacy/orderedList';
import { MemberStore, ModalStore } from '@/types/member/member';
import { PharmacyMemberStore, PredictItemStore, PredictPharmacyStore } from '@/types/wholesaler/predictItem';
import { SelectedStore } from '@/types/pharmacy/medicine';

/* 회원 */
export const useMemberStore = create<MemberStore>()(
    persist(
        (set) => ({
            member: 'PHARMACY',
            setMember: (newState) => set({ member: newState }),
            isLogin: false,
            setLogin: () => set({ isLogin: true }),
            setLogout: () => set({ isLogin: false }),
            name: '',
            setName: (memberName) => set({ name: memberName }),
            zipCode: '',
            setZipCode: (data) => set({ zipCode: data }),
            roadAddress: '',
            setRoadAddress: (data) => set({ roadAddress: data }),
            detailAddress: '',
            setDetailAddress: (data) => set({ detailAddress: data }),
        }),
        {
            name: 'memberNameStorage',
        }
    )
)

/* 모달창 */
// 로그인 성공
export const useLoginModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 로그인 실패
export const useLoginFailModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 로그인 실패 - 이메일이 존재하지 않음
export const useNotExistEmailModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 로그인/회원 정보 수정 실패 - 비밀번호 불일치
export const useWrongPwModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 로그인 실패 - 탈퇴한 사용자
export const useWithdrawalUserModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 회원가입 성공
export const useSignupModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 회원가입/회원 정보 수정 - 주소 입력
export const useAddressModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 회원 정보 수정 성공
export const useEditMyInfoModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 회원가입 - 탈퇴한 사용자 이메일 사용
export const useSignupInvalidEmailStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 로그아웃 안내
export const useLogoutModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 토큰 만료 후 로그아웃 안내
export const useTokenExpirationModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 회원 탈퇴 요청
export const useWithdrawalModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 회원 탈퇴 성공
export const useWithdrawalSuccessModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 장바구니에 약품 담기 성공
export const useCartModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 장바구니 물품 주문 성공
export const useOrderModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 장바구니에 약품 담기 - 재고 수량 초과 
export const useCautionModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 주문 내역 - 적절하지 않은 날짜 입력
export const useDateModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))
// 헤더 - 멤버 모달
export const useMemberModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))

/* 약국 */
// 오늘의 주문
export const useAnalysisStore = create<TodaysOrderStore>((set) => ({
    click: false,
    setButtonOn: () => set({ click: true }),
    setButtonOff: () => set({ click: false }),
    result: [],
    setResult: (newResult) => set({ result: newResult }),
    dayData: [],
    setDayData: (newResult) => set({ dayData: newResult }),
    dowData: [],
    setDowData: (newResult) => set({ dowData: newResult }),
    weekData: [],
    setWeekData: (newResult) => set({ weekData: newResult }),
    monthData: [],
    setMonthData: (newResult) => set({ monthData: newResult }),
    filterList: ['DAY'],
    setFilterList: (filterName) =>
        set((state) => {
            if (state.filterList?.includes(filterName)) {
                return { filterList: state.filterList.filter((item) => item !== filterName) };
            } else {
                return { filterList: [...state.filterList, filterName] };
            }
        })
}))
// 요즘 약국 랭킹
export const useMedRankingStore = create<PharmacyRankingStore>((set) => ({
    click: false,
    setButtonOn: () => set({ click: true }),
    setButtonOff: () => set({ click: false }),
    result: [],
    setResult: (newResult) => set({ result: newResult })
}))
// 약품 선택
export const useSelectedMedStore = create<SelectedStore>((set) => ({
    selectedNumber: null,
    setSelectedNumber: (id) => set({ selectedNumber: id }),
    expectedQty: 0,
    setExpectedQty: (qty) => set({ expectedQty: qty }),
}))
// 장바구니
export const useCartStore = create<CartStore>((set, get) => ({
    cart: [],
    addToCart: (item) => set((state) => {
        // 약품 id, 단위, 도매상이 모두 동일한 상품이 존재할 경우 수량만 추가
        const existingItem = state.cart.find(cartItem =>
            cartItem.medicineId === item.medicineId
            && cartItem.wholesaleId === item.wholesaleId
        );

        if (existingItem) {
            return {
                cart: state.cart.map(cartItem =>
                    cartItem.medicineId === item.medicineId && cartItem.wholesaleId === item.wholesaleId
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                )
            };
        }
        // 상품이 존재하지 않을 경우 새로운 항목으로 추가
        return { cart: [...state.cart, item] };
    }),
    removeFromCart: (cartItemId) => set((state) => ({
        cart: state.cart.filter(item => item.cartItemId !== cartItemId)
    })),
    updateQuantity: (cartItemId, quantity) => set((state) => ({
        cart: state.cart.map(item =>
            item.cartItemId === cartItemId ? { ...item, quantity } : item
        )
    })),
    clearCart: () => set({ cart: [] }),
    getTotalPrice: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + (item.unitPrice * item.quantity), 0);
    },
    isAbleToAdd: (item, maxQuantity) => {
        const state = get();
        const isExist = state.cart.some(cartItem => {
            return cartItem.medicineId === item.medicineId
                && cartItem.wholesaleId === item.wholesaleId;
        }
        );

        if (isExist) {
            return state.cart.some(cartItem =>
                cartItem.medicineId === item.medicineId
                && cartItem.wholesaleId === item.wholesaleId
                && cartItem.quantity + item.quantity <= maxQuantity
            );
        } else {
            return true;
        }
    }
}))
// 주문 내역
export const useOrderedListStore = create<OrderedListStore>((set, get) => ({
    orderedList: [],
    addToOrderedList: (item) => set((state) => {
        const newOrderHistory = {
            orderId: 0,
            orderNumber: "",
            orderTotalPrice: item.price * item.quantity,
            orderDateTime: new Date().toISOString().split('T')[0],
        }
        return { orderedList: [...state.orderedList, newOrderHistory] }
    }),
    getTotalPrice: () => {
        const state = get();
        return state.orderedList.reduce((total, item) => total + item.orderTotalPrice, 0);
    }
}))
// 주문 내역 상세 보기(약국, 도매상) 
export const useSelectedOrderStore = create<SelectedStore>((set) => ({
    selectedNumber: null,
    setSelectedNumber: (index) => set({ selectedNumber: index }),
}))

/* 도매상 */
// 주문 예상 품목
export const usePredictItemStore = create<PredictItemStore>((set) => ({
    result: [],
    setResult: (newResult) => set({ result: newResult }),
    updateQuantity: (id, quantity) =>
        set((state) => ({
            result: state.result.map(item =>
                item.medicineId === id ? { ...item, expectedQty: quantity } : item
            ),
        })),
    updateTotalPrice: (id, totalPrice) =>
        set((state) => ({
            result: state.result.map(item =>
                item.medicineId === id ? { ...item, totalPrice: totalPrice } : item
            ),
        })),
}))
// 주문 예상 품목 - 약품 선택
export const useSelectedItemStore = create<SelectedStore>((set) => ({
    selectedNumber: null,
    setSelectedNumber: (index) => set({ selectedNumber: index }),
}))
// 주문 예상 약국
export const usePredictPharmacyStore = create<PredictPharmacyStore>((set, get) => ({
    medInfoList: [],
    setMedInfoList: (newList) => set({ medInfoList: newList }),
    getTotalQuantity: () => {
        const state = get();
        return state.medInfoList.reduce((total, item) => total + item.expectedQty, 0);
    }
}))
// 약국 회원 리스트
export const usePharmacyMemberStore = create<PharmacyMemberStore>((set) => ({
    result: [],
    setResult: (newResult) => set({ result: newResult }),
}))
// 약국 회원 선택
export const useSelectedMemberStore = create<SelectedStore>((set) => ({
    selectedNumber: null,
    setSelectedNumber: (index) => set({ selectedNumber: index }),
}))