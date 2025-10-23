import Image from "next/image";
import Button from "@/components/common/Button";
import { VscChromeClose } from "react-icons/vsc";

import { useCartStore, useOrderedListStore, useOrderModalStore } from "@/store/store";
import { AuthAPI } from "@/apis/axiosInstance";

export default function Cart() {
    const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCartStore();
    const { addToOrderedList } = useOrderedListStore();
    const { setIsModalOpen } = useOrderModalStore();

    const handleQuantityChange = async (id: string, value: string) => {
        const numValue = parseInt(value) || 0;
        try {
            if (numValue > 0) {
                const result = await AuthAPI.editQuantity(Number(id), Number(value));
                if (result) {
                    updateQuantity(id, numValue);
                    console.log("수량 변경 성공");
                }
            }
        } catch (error) {
            alert("수량 변경 실패");
            console.log(error);
        }
    };

    const handleRemoveItem = async (id: string) => {
        try {
            const result = await AuthAPI.cancelCart(Number(id));
            if (result) {
                removeFromCart(id);
                console.log("장바구니에서 약품 삭제 성공");
            }
        } catch (error) {
            alert("장바구니에서 약품 삭제 실패");
            console.log(error);
        }
    };

    const handleOrder = () => {
        // 주문 내역에 물품들 추가
        cart.map((item) => {
            addToOrderedList(item);
        })
        clearCart(); // 장바구니 비우기
        setIsModalOpen();
    };

    if (cart.length === 0) {
        return (
            <div className="flex flex-col h-full items-center justify-center">
                <Image
                    src="/assets/cart_plus_icon.png"
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
                                    <span className="text-sm md:text-lg font-medium text-main-font mb-1">
                                        {item.name}
                                    </span>
                                    <div className="text-[8px] md:text-sm space-y-1">
                                        <div className="flex flex-row">
                                            <span className="w-[40%] text-sub-font">단위</span>
                                            <span className="w-[60%] text-main-color">{item.unit}</span>
                                        </div>
                                        <div className="flex flex-row">
                                            <span className="w-[40%] text-sub-font">도매상</span>
                                            <span className="w-[60%] text-main-color">{item.wholesaler}</span>
                                        </div>
                                        <div className="flex flex-row">
                                            <span className="w-[40%] text-sub-font">약품 단가</span>
                                            <span className="w-[60%] text-main-font">{item.price.toLocaleString()}</span>
                                        </div>
                                        <div className="flex flex-row items-center">
                                            <span className="text-sm text-sub-font w-[40%]">수량</span>
                                            <input
                                                type="number"
                                                min="1"
                                                max={item.available}
                                                placeholder="0"
                                                value={item.quantity || ""}
                                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                                className="w-16 py-1 border border-gray-300 rounded focus:outline-none focus:border-selected-line focus:bg-selected-bg text-center text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item.id)}
                                    className="text-gray-600 hover:text-red-600 hover:rotate-90 duration-300 transition-colors transition-transform"
                                >
                                    <VscChromeClose size={28} />
                                </button>
                            </div>

                            <div className="w-full h-[1px] bg-gray-200" />

                            <div className="flex flex-row items-center justify-end">
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
                <Button
                    text="주문하기"
                    height={60}
                    bgColor="main-color"
                    onClick={handleOrder}
                />
            </div>
        </div>
    );
}
