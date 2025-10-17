import Image from "next/image";

interface NotiModalProps {
    message: string; // 모달창 안내 멘트
    onClose: () => void; // 버튼 눌렀을 때의 동작 함수
}

export default function NotiModal({ message, onClose }: NotiModalProps) {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // 모달 이외 영역 클릭 시 모달창 종료
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-main-font bg-opacity-30"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-xl shadow-lg px-6 py-4 flex flex-col items-center justify-center gap-3 min-w-[400px] min-h-[300px] animate-slideDown">
                <div className="flex-shrink-0">
                    <Image
                        src="/assets/check_icon.png"
                        width={150}
                        height={150}
                        alt="modal check icon"
                        priority
                    />
                </div>
                <p className="text-base text-main-font text-lg flex-0 whitespace-pre-line text-center">{message}</p>
            </div>
        </div>
    );
}
