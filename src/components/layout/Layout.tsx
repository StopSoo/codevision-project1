import React from "react";
import Header from "../common/Header";
import { useCartModalStore } from "@/store/store";
import CartModal from "../modal/CartModal";
import { useMemberStore } from "@/store/store";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isModalOpen, setIsModalClose } = useCartModalStore();
    const { member } = useMemberStore();

    return (
        <div className="flex flex-col w-full h-screen">
            <Header pharmacy={member === 'pharmacy'} />
            {
                isModalOpen
                    ? <CartModal
                        message="약품이 정상적으로 장바구니에 담겼습니다!"
                        onClose={setIsModalClose}
                    />
                    : null
            }
            <main className="px-[66px] py-[80px] w-full">{children}</main>
        </div>
    );
}
