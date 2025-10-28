import Image from "next/image";
import Button from "@/components/common/Button";
import { VscChromeClose } from "react-icons/vsc";

import { useCartStore, useOrderedListStore, useOrderModalStore } from "@/store/store";
import { deleteAllCart, deleteCartItem, getAllCarts, patchEditCart } from "@/apis/cart";
import { useEffect } from "react";

export default function Cart() {
    const { cart, addToCart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCartStore();
    const { addToOrderedList } = useOrderedListStore();
    const { setIsModalOpen } = useOrderModalStore();

    const allCancelButtonStyle = "w-full h-[30px] py-5 mb-[9px] flex flex-row items-center justify-center border-2 border-sub-font hover:bg-selected-bg hover:border-selected-line rounded-xl"

    const handleQuantityChange = async (cartItemId: number, quantity: number) => {
        try {
            const result = await patchEditCart(
                cartItemId,
                { quantity }
            );

            if (result) {
                updateQuantity(cartItemId, quantity);
                console.log("수량 변경 성공");
            }
        } catch (error) {
            alert("수량 변경 실패");
            console.log(error);
        }
    };

    const handleRemoveItem = async (cartItemId: number) => {
        try {
            const result = await deleteCartItem(cartItemId);
            if (result) {
                removeFromCart(cartItemId);
                console.log("장바구니에서 개별 약품 삭제 성공");
            }
        } catch (error) {
            alert("장바구니에서 개별 약품 삭제 실패");
            console.log(error);
        }
    };

    const handleRemoveAllItem = async () => {
        try {
            const result = await deleteAllCart();
            if (result) {
                clearCart();
            }
        } catch (error) {
            alert("장바구니에서 전체 상품 삭제 실패");
            console.log(error);
        }
    };

    const handleAllItem = async () => {
        try {
            // 장바구니 전체 조회
            const result = await getAllCarts();

            if (result && "items" in result) {
                // TODO: getAllCarts() 함수 response에 필드 두 개 추가되면 확인하고 debug code 삭제
                console.log(result.items); // debug
                result.items.map((item) => {
                    addToCart(item);
                });
                console.log(cart); // debug
            }
        } catch (error) {
            alert("장바구니에서 전체 상품 불러오기 실패");
            console.log(error);
        }
    }

    const handleOrder = () => {
        // 주문 내역에 물품들 추가
        cart.map((item) => {
            addToOrderedList(item);
        })
        clearCart(); // 장바구니 비우기
        setIsModalOpen();
        // TODO: API 연동
    };

    useEffect(() => {
        handleAllItem();
    }, []);

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
            {
                cart.length > 0
                    ? <button
                        className={allCancelButtonStyle}
                        onClick={handleRemoveAllItem}
                    >
                        전체 취소
                    </button>
                    : null
            }
            <div className="flex-1 overflow-y-auto pr-2">
                <div className="flex flex-col gap-3">
                    {cart.map((item) => (
                        <div
                            key={String(item.wholesaleName) + String(item.medicineId)}
                            className="border border-gray-200 rounded-lg p-4 flex flex-col gap-3"
                        >
                            <div className="flex flex-row items-start justify-between">
                                <div className="flex-1">
                                    <span className="text-sm md:text-lg font-medium text-main-font mb-1">
                                        {item.medicineName}
                                    </span>
                                    <div className="text-[8px] md:text-sm space-y-1">
                                        <div className="flex flex-row">
                                            <span className="w-[40%] text-sub-font">단위</span>
                                            <span className="w-[60%] text-main-color">{item.unit}</span>
                                        </div>
                                        <div className="flex flex-row">
                                            <span className="w-[40%] text-sub-font">도매상</span>
                                            <span className="w-[60%] text-main-color">{item.wholesaleName}</span>
                                        </div>
                                        <div className="flex flex-row">
                                            <span className="w-[40%] text-sub-font">약품 단가</span>
                                            <span className="w-[60%] text-main-font">{item.unitPrice.toLocaleString()}</span>
                                        </div>
                                        <div className="flex flex-row items-center">
                                            <span className="text-sm text-sub-font w-[40%]">수량</span>
                                            <input
                                                type="number"
                                                min="1"
                                                max={item.available}
                                                placeholder="0"
                                                value={item.quantity || ""}
                                                // TODO: cartItemId로 변경
                                                onChange={(e) => handleQuantityChange(item.medicineId, Number(e.target.value))}
                                                className="w-16 py-1 border border-gray-300 rounded focus:outline-none focus:border-selected-line focus:bg-selected-bg text-center text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <button
                                    // TODO: cartItemId로 변경
                                    onClick={() => handleRemoveItem(item.medicineId)}
                                    className="text-gray-600 hover:text-red-600 hover:rotate-90 duration-300 transition-colors transition-transform"
                                >
                                    <VscChromeClose size={28} />
                                </button>
                            </div>

                            <div className="w-full h-[1px] bg-gray-200" />

                            <div className="flex flex-row items-center justify-end">
                                <div className="text-lg font-medium text-main-font">
                                    {(item.unitPrice * item.quantity).toLocaleString()}원
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
