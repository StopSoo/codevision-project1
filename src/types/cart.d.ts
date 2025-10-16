export type CartItem = {
    id: string;
    name: string;
    dosage: string;
    unit: string;
    price: number;
    quantity: number;
    wholesaler: string;
    manufacturer: string;
    code: string;
}

export type CartStore = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
}

export type CartModalStore = {
    isCartModalOpen: boolean;
    setIsCartModalOpen: () => void;
}