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
    available: number;
}

export type CartStore = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
}