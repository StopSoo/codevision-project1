import React from "react";
import Header from "../common/Header";
import { useCartModalStore, useCautionModalStore, useDateModalStore, useMemberStore, useOrderModalStore } from "@/store/store";
import CartModal from "../modal/CartModal";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isModalOpen, setIsModalClose } = useCartModalStore();
    const { isModalOpen: isOrderModalOpen, setIsModalClose: setIsOrderModalClose } = useOrderModalStore();
    const { isModalOpen: isCautionModalOpen, setIsModalClose: setIsCautionModalClose } = useCautionModalStore();
    const { isModalOpen: isDateModalOpen, setIsModalClose: setIsDateModalClose } = useDateModalStore();

    const { member } = useMemberStore();

    return (
        <div className="flex flex-col w-full h-screen">
            <Header pharmacy={member === 'pharmacy'} />
            {
                isModalOpen
                    ? <CartModal
                        type='cart'
                        message="약품이 정상적으로 장바구니에 담겼습니다!"
                        onClose={setIsModalClose}
                    />
                    : null
            }
            {
                isCautionModalOpen
                    ? <CartModal
                        type='caution'
                        message="재고 수량 초과입니다."
                        onClose={setIsCautionModalClose}
                    />
                    : null
            }

            {
                isOrderModalOpen
                    ? <CartModal
                        type='order'
                        message={`주문이 정상적으로 완료되었습니다!\n지금 바로 주문내역을 확인해보세요.`}
                        onClose={setIsOrderModalClose}
                    />
                    : null
            }
            {
                isDateModalOpen
                    ? <CartModal
                        type='caution'
                        message={`선택하신 기간이 잘못되었습니다!\n날짜를 다시 선택해주세요.`}
                        onClose={setIsDateModalClose}
                    />
                    : null
            }
            <main className="px-[66px] py-[80px] w-full">{children}</main>
        </div>
    );
}
