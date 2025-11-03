import Image from "next/image";
import { useCartModalStore, useCautionModalStore, useOrderModalStore } from "@/store/store";
import { useEffect } from "react";

interface CartModalProps {
    type: 'cart' | 'order' | 'caution';
    message: string; // 모달창 안내 멘트
    onClose: () => void; // 버튼 눌렀을 때의 동작 함수
}

export default function CartModal({ type, message, onClose }: CartModalProps) {
    const { isModalOpen, setIsModalClose } = useCartModalStore();
    const { isModalOpen: isCautionModalOpen, setIsModalClose: setIsCautionModalClose } = useCautionModalStore();
    const { isModalOpen: isOrderModalOpen, setIsModalClose: setIsOrderModalClose } = useOrderModalStore();

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // 모달 이외 영역 클릭 시 모달창 종료
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => {
                setIsModalClose();
            }, 1000);
        }

        if (isCautionModalOpen) {
            setTimeout(() => {
                setIsCautionModalClose();
            }, 1000);
        }
    }, [isModalOpen, setIsModalClose, isCautionModalOpen, setIsCautionModalClose]);

    useEffect(() => {
        if (isOrderModalOpen) {
            setTimeout(() => {
                setIsOrderModalClose();
            }, 2000);
        }
    }, [isOrderModalOpen, setIsOrderModalClose]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-main-font bg-opacity-30"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-xl shadow-lg px-6 py-4 flex items-center gap-3 min-w-[400px] animate-slideDown">
                <div className="flex-shrink-0">
                    {
                        type === 'cart'
                            ? <Image
                                src="/assets/check_icon.png"
                                width={50}
                                height={50}
                                alt="modal check icon"
                                priority
                            />
                            : type === 'order'
                                ? <Image
                                    src="/assets/check_list_icon.png"
                                    width={50}
                                    height={50}
                                    alt="modal check list icon"
                                    priority
                                />
                                : <Image
                                    src="/assets/alert_icon.png"
                                    width={50}
                                    height={50}
                                    alt="modal alert icon"
                                    priority
                                />
                    }
                </div>
                <p className="text-base text-main-font text-lg flex-1 whitespace-pre-line text-center">{message}</p>
                {
                    type === 'order' && <button
                        name="close modal button"
                        onClick={onClose}
                        className="flex-shrink-0 text-sub-font hover:text-unselected-font transition-colors"
                    >
                        닫기
                    </button>
                }
            </div>
        </div>
    );
}
