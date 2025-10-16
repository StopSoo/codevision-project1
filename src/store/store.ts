import { DataType } from '@/components/order/AnalysisList';
import { create } from 'zustand';

import { CartItem, CartStore, CartModalStore } from '@/types/cart';
import { AnalysisStore, SelectedMedStore } from '@/types/todaysOrder';
import { OrderedListStore } from '@/types/orderedList';

/* 약국 */
// 오늘의 주문
export const useAnalysisStore = create<AnalysisStore>((set) => ({
    clickAnalysis: false,
    setClickAnalysis: () => set((state) => ({ clickAnalysis: !state.clickAnalysis })),
    result: [],
    setResult: (newResult: DataType[]) => set({ result: newResult })
}))

// 약품 선택
export const useSelectedMedStore = create<SelectedMedStore>((set) => ({
    selectedMedNumber: null,
    setSelectedMedNumber: (index: number | null) => set({ selectedMedNumber: index }),
}))

// 장바구니
export const useCartStore = create<CartStore>((set, get) => ({
    cart: [],
    addToCart: (item: CartItem) => set((state) => {
        // 동일한 상품이 존재할 경우 수량만 추가
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id);
        if (existingItem) {
            return {
                cart: state.cart.map(cartItem =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                        : cartItem
                )
            };
        }
        // 상품이 존재하지 않을 경우 새로운 항목으로 추가
        return { cart: [...state.cart, item] };
    }),
    removeFromCart: (id: string) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
    })),
    updateQuantity: (id: string, quantity: number) => set((state) => ({
        cart: state.cart.map(item =>
            item.id === id ? { ...item, quantity } : item
        )
    })),
    clearCart: () => set({ cart: [] }),
    getTotalPrice: () => {
        const state = get();
        return state.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}))

// 장바구니 담기 모달
export const useCartModalStore = create<CartModalStore>((set) => ({
    isCartModalOpen: false,
    setIsCartModalOpen: () => set((state) => ({ isCartModalOpen: !state.isCartModalOpen }))
}))

// 주문 내역
export const useOrderedListStore = create<OrderedListStore>((set) => ({
    orderedList: [],
    addToOrderedList: (item: CartItem) => set((state) => {
        const newOrderHistory = {
            date: new Date().toDateString(),
            wholesaler: item.wholesaler,
            price: item.price,
            unit: item.unit,
            quantity: item.quantity,
            totalPrice: item.price * item.quantity,
        }
        return { orderedList: [...state.orderedList, newOrderHistory] }
    })
}))


/* 도매상 */