import Image from "next/image";

interface NotiModalProps {
    type: 'check' | 'alert';
    message: string; // 모달창 안내 멘트
    hasButton: boolean; // 버튼 존재 여부
    hasTwoButton?: boolean; // 예/아니오 버튼 or 확인 버튼
    onClose: () => void; // 버튼 눌렀을 때의 동작 함수
    onClickYes?: () => void; // 예 버튼 눌렀을 때의 동작 함수
    onClickNo?: () => void; // 아니오 버튼 눌렀을 때의 동작 함수
}

export default function NotiModal({
    type, message, hasButton, hasTwoButton, onClickYes, onClickNo, onClose
}: NotiModalProps) {
    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center pt-20 bg-main-font bg-opacity-30"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-xl shadow-lg px-6 py-6 flex flex-col items-center justify-center gap-8 min-w-[400px] min-h-[300px] animate-slideDown">
                <div className="flex-shrink-0">
                    {
                        type === 'check'
                            ? <Image
                                src="/assets/check_icon.png"
                                width={100}
                                height={100}
                                alt="modal check icon"
                                priority
                            />
                            : <Image
                                src="/assets/alert_icon.png"
                                width={100}
                                height={100}
                                alt="modal alert icon"
                                priority
                            />
                    }
                </div>

                <p className="text-base text-main-font flex-0 whitespace-pre-line text-center">
                    {message}
                </p>

                {
                    hasButton ?
                        (
                            hasTwoButton
                                ? <div className="flex flex-row w-full items-center justify-center gap-3">
                                    <button
                                        className="w-full px-6 py-3 border-2 rounded-xl hover:bg-selected-bg hover:border-selected-line"
                                        onClick={onClickYes}
                                    >
                                        예
                                    </button>
                                    <button
                                        className="w-full px-6 py-3 border-2 rounded-xl hover:bg-selected-bg hover:border-selected-line"
                                        onClick={onClickNo}
                                    >
                                        아니오
                                    </button>
                                </div>
                                : <div className="flex flex-row w-full items-center justify-center gap-3">
                                    <button
                                        className="w-full px-6 py-3 border-2 rounded-xl hover:bg-selected-bg hover:border-selected-line"
                                        onClick={onClickYes}
                                    >
                                        확인
                                    </button>
                                </div>
                        )
                        : null
                }
            </div>
        </div>
    );
}
