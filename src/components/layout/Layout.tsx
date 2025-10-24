import React, { useEffect } from "react";
import Header from "../common/Header";
import { useCartModalStore, useCautionModalStore, useDateModalStore, useLogoutModalStore, useMemberModalStore, useMemberStore, useOrderModalStore } from "@/store/store";
import CartModal from "../modal/CartModal";
import MemberModal from "../modal/MemberModal";
import NotiModal from "../modal/NotiModal";
import { setUnauthorizedHandler } from "@/apis/axiosInstance";

export default function Layout({ children }: { children: React.ReactNode }) {
    const { isModalOpen, setIsModalClose } = useCartModalStore();
    const { isModalOpen: isOrderModalOpen, setIsModalClose: setIsOrderModalClose } = useOrderModalStore();
    const { isModalOpen: isCautionModalOpen, setIsModalClose: setIsCautionModalClose } = useCautionModalStore();
    const { isModalOpen: isDateModalOpen, setIsModalClose: setIsDateModalClose } = useDateModalStore();
    const { isModalOpen: isMemberModalOpen, setIsModalClose: setIsMemberModalClose } = useMemberModalStore();
    const { isModalOpen: isLogoutModalOpen, setIsModalOpen: setIsLogoutModalOpen, setIsModalClose: setIsLogoutModalClose } = useLogoutModalStore();
    const { member } = useMemberStore();

    useEffect(() => {
        setUnauthorizedHandler(() => {
            setIsLogoutModalOpen();
        });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsLogoutModalClose();
            window.location.href = '/';
        }, 3000);
    }, [isLogoutModalOpen]);

    return (
        <div className="flex flex-col w-full h-screen">
            <Header pharmacy={member === 'PHARMACY'} />
            {
                isLogoutModalOpen
                    ? <NotiModal
                        type='alert'
                        message={`3초 후 로그아웃되고\n로그인 페이지로 이동합니다.`}
                        onClose={setIsLogoutModalClose}
                    />
                    : null
            }
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
            {
                isMemberModalOpen
                    ? <MemberModal
                        onClose={setIsMemberModalClose}
                    />
                    : null
            }
            <main className="px-[66px] py-[80px] w-full">{children}</main>
        </div>
    );
}
