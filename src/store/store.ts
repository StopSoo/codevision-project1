import { DataType } from '@/components/order/AnalysisList';
import { create } from 'zustand';

import { CartItem, CartStore } from '@/types/cart';
import { AnalysisStore, SelectedMedStore } from '@/types/todaysOrder';
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
    setSelectedMedNumber: (index: number) => set({ selectedMedNumber: index }),
}))

// 장바구니
export const useCartStore = create<CartStore>((set, get) => ({
    cart: [],
    addToCart: (item: CartItem) => set((state) => {
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


/* 도매상 */