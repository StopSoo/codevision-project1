import { create } from 'zustand';

import { CartStore } from '@/types/cart';
import { PharmacyRankingStore, TodaysOrderStore } from '@/types/order';
import { OrderedListStore } from '@/types/orderedList';
import { MemberStore, ModalStore } from '@/types/member';
import { OrderItemStore, PharmacyMemberStore, PredictItemStore, PredictPharmacyStore } from '@/types/predictItem';
import { SelectedStore } from '@/types/medicine';

/* 회원 */
export const useMemberStore = create<MemberStore>((set) => ({
    member: 'WHOLESALE',
    setMember: (newState) => set({ member: newState }),
    isLogin: false,
    setLogin: () => set({ isLogin: true }),
    setLogout: () => set({ isLogin: false }),
    // API 연결 시 변경
    name: '정지수',
    setName: (memberName) => set({ name: memberName }),
    zipCode: '',
    setZipCode: (data) => set({ zipCode: data }),
    roadAddress: '',
    setRoadAddress: (data) => set({ roadAddress: data }),
    detailAddress: '',
    setDetailAddress: (data) => set({ detailAddress: data }),
}))

/* 로그인 성공/로그인 실패/회원가입/장바구니/주문하기/재고수량초과/날짜 변경/회원명 버튼/로그아웃/주소 검색 모달 */
export const useLoginModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))

export const useLoginFailModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))

export const useSignupModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))

export const useCartModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))

export const useOrderModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))

export const useCautionModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))

export const useDateModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))

export const useMemberModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))

export const useLogoutModalStore = create<ModalStore>((set) => ({
    isModalOpen: false,
    setIsModalOpen: () => set({ isModalOpen: true }),
    setIsModalClose: () => set({ isModalOpen: false })
}))

export const useAddressModalStore = create<ModalStore>((set) => ({
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
    filterList: ['day'],
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
    setSelectedNumber: (index) => set({ selectedNumber: index }),
}))

// 장바구니
export const useCartStore = create<CartStore>((set, get) => ({
    cart: [],
    addToCart: (item) => set((state) => {
        // 동일한 상품이 존재할 경우 수량만 추가
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            return {
                cart: state.cart.map(cartItem =>
                    cartItem.id === item.id
                        ? (cartItem.quantity + item.quantity <= item.available
                            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                            : cartItem
                        )
                        : cartItem
                )
            };
        }
        // 상품이 존재하지 않을 경우 새로운 항목으로 추가
        return { cart: [...state.cart, item] };
    }),
    removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
    })),
    updateQuantity: (id, quantity) => set((state) => ({
        cart: state.cart.map(item =>
            item.id === id ? { ...item, quantity } : item
        )
    })),
    clearCart: () => set({ cart: [] }),
    getTotalPrice: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    },
    isAbleToAdd: (item) => {
        const state = get();
        const isExist = state.cart.some(cartItem => cartItem.id === item.id);
        // 해당 물품이 존재할 경우에만 수량 체크
        if (isExist) {
            return state.cart.some(cartItem =>
                cartItem.id === item.id &&
                cartItem.quantity + item.quantity <= item.available
            )
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
            date: new Date().toISOString().split('T')[0],
            wholesaler: item.wholesaler,
            price: item.price,
            unit: item.unit,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
        }
        return { orderedList: [...state.orderedList, newOrderHistory] }
    }),
    getTotalPrice: () => {
        const state = get();
        return state.orderedList.reduce((total, item) => total + item.totalPrice, 0);
    }
}))


/* 도매상 */
// 주문 예상 품목
export const usePredictItemStore = create<PredictItemStore>((set) => ({
    result: [],
    setResult: (newResult) => set({ result: newResult }),
    updateQuantity: (id, quantity) =>
        set((state) => ({
            result: state.result.map(item =>
                item.id === id ? { ...item, quantity } : item
            ),
        })),
    updateTotalPrice: (id, unitPrice, quantity) =>
        set((state) => ({
            result: state.result.map(item =>
                item.id === id ? { ...item, price: unitPrice * quantity } : item
            ),
        })),
}))

// 주문 예상 품목 - 약품 선택
export const useSelectedItemStore = create<SelectedStore>((set) => ({
    selectedNumber: null,
    setSelectedNumber: (index) => set({ selectedNumber: index }),
}))

// 주문 내역
export const useOrderItemStore = create<OrderItemStore>((set, get) => ({
    orderedList: [],
    addToOrderedList: (item) => set((state) => {
        const newOrderHistory = {
            id: state.orderedList.length,
            date: new Date().toISOString().split('T')[0],
            name: item.name,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            price: item.unitPrice * item.quantity,
        }
        return { orderedList: [...state.orderedList, newOrderHistory] }
    }),
    removeFromOrderedList: (id) => set((state) => ({
        orderedList: state.orderedList.filter(item => item.id !== id)
    })),
    clearOrderedList: () => set({ orderedList: [] }),
    getTotalPrice: () => {
        const state = get();
        return state.orderedList.reduce((total, item) => total + item.price, 0);
    },
}))

// 주문 예상 약국
export const usePredictPharmacyStore = create<PredictPharmacyStore>((set, get) => ({
    medInfoList: [],
    setMedInfoList: (newList) => set({ medInfoList: newList }),
    getTotalQuantity: () => {
        const state = get();
        return state.medInfoList.reduce((totalQuantity, item) => totalQuantity + item.quantity, 0);
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