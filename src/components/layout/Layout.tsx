import React from "react";
import Header from "../common/Header";
import { useCartModalStore } from "@/store/store";
import CartModal from "../order/Modal";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isCartModalOpen, setIsCartModalClose } = useCartModalStore();

    return (
        <div className="flex flex-col w-full h-screen">
            <Header pharmacy={true} />
            {
                isCartModalOpen
                    ? <CartModal
                        message="약품이 정상적으로 장바구니에 담겼습니다!"
                        onClose={() => setIsCartModalClose()}
                    />
                    : null
            }
            <main className="px-[66px] py-[80px] w-full">{children}</main>
        </div>
    );
}
