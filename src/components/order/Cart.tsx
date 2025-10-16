import Image from "next/image";
import { useCartStore } from "@/store/store";
import Button from "@/components/common/Button";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCartStore();

    const handleQuantityChange = (id: string, value: string) => {
        const numValue = parseInt(value) || 0;
        if (numValue > 0) {
            updateQuantity(id, numValue);
        }
    };

    const handleRemoveItem = (id: string) => {
        removeFromCart(id);
    };

    const handleOrder = () => {
        console.log("Placing order:", cart);
        // TODO: Implement order logic
    };

    if (cart.length === 0) {
        return (
            <div className="flex flex-col h-full items-center justify-center">
                <Image
                    src="/assets/icon3.png"
                    width={138}
                    height={138}
                    alt="empty cart logo"
                    className="mb-[24px]"
                />
                <div className="text-center text-sub-font whitespace-nowrap">
                    필요한 약품과 수량을 선택해<br />장바구니에 담아보세요!
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto pr-2">
                <div className="flex flex-col gap-3">
                    {cart.map((item) => (
                        <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3"
                        >
                            <div className="flex flex-row items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="text-lg font-medium text-main-font mb-1">
                                        {item.name}
                                    </h3>
                                    <div className="text-sm text-sub-font space-y-1">
                                        <div>규격: {item.dosage}</div>
                                        <div>단위: {item.unit}</div>
                                        <div>도매상: {item.wholesaler}</div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M15 5L5 15M5 5L15 15"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="w-full h-[1px] bg-gray-200" />

                            <div className="flex flex-row items-center justify-between">
                                <div className="flex flex-row items-center gap-2">
                                    <span className="text-sm text-sub-font">수량:</span>
                                    <input
                                        type="number"
                                        min="1"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-main-color text-center text-sm"
                                    />
                                </div>
                                <div className="text-lg font-medium text-main-font">
                                    {(item.price * item.quantity).toLocaleString()}원
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="h-[1px] bg-gray-300 my-4" />

            <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center justify-between px-2">
                    <span className="text-lg font-medium text-main-font">총 결제 금액</span>
                    <span className="text-xl font-bold text-main-color">
                        {getTotalPrice().toLocaleString()}원
                    </span>
                </div>
                <Button text="주문하기" height={60} onClick={handleOrder} />
            </div>
        </div>
    );
}
