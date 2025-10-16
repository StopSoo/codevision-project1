export type OrderedItem = {
    date: string;
    wholesaler: string;
    price: number;
    unit: string;
    quantity: number;
    totalPrice: number;
}

export type OrderedListStore = {
    orderedList: OrderedItem[];
    addToOrderedList: (item: CartItem) => void;
}