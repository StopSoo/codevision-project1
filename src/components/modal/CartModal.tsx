import Image from "next/image";
import { useCartModalStore } from "@/store/store";
import { useEffect } from "react";

interface CartModalProps {
    message: string; // 모달창 안내 멘트
    onClose: () => void; // 버튼 눌렀을 때의 동작 함수
}

export default function CartModal({ message, onClose }: CartModalProps) {
    const { isModalOpen, setIsModalClose } = useCartModalStore();

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
    }, [isModalOpen, setIsModalClose])


    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-main-font bg-opacity-30"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-xl shadow-lg px-6 py-4 flex items-center gap-3 min-w-[400px] animate-slideDown">
                <div className="flex-shrink-0">
                    <Image
                        src="/assets/check_icon.png"
                        width={50}
                        height={50}
                        alt="modal check icon"
                        priority
                    />
                </div>
                <p className="text-base text-main-font text-lg flex-1">{message}</p>
                <button
                    onClick={onClose}
                    className="flex-shrink-0 text-sub-font hover:text-unselected-font transition-colors"
                >
                    닫기
                </button>
            </div>
        </div>
    );
}
