import { postWithdrawMember } from "@/apis/member";
import { useWithdrawalFailModalStore, useWithdrawalModalStore, useWithdrawalSuccessModalStore } from "@/store/store";
import Image from "next/image";
import { useState } from "react";

interface WithdrawalModalProps {
    type: 'process' | 'complete';
    message: string; // 모달창 안내 멘트
    onClose: () => void; // 버튼 눌렀을 때의 동작 함수
}

export default function WithdrawalModal({ type, message, onClose }: WithdrawalModalProps) {
    const [password, setPassword] = useState('');

    const { setIsModalClose: setIsWithdrawalModalClose } = useWithdrawalModalStore();
    const { setIsModalOpen: setIsWithdrawalSuccessModalOpen } = useWithdrawalSuccessModalStore();
    const { setIsModalOpen: setIsWithdrawalFailModalOpen } = useWithdrawalFailModalStore();

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    // 회원 탈퇴
    const handleWithdrawMember = async () => {
        try {
            const result = await postWithdrawMember(password);

            if (result && "data" in result) {
                setIsWithdrawalModalClose();
                setIsWithdrawalSuccessModalOpen();
            } else {
                setIsWithdrawalFailModalOpen();
            }
        } catch (error) {
            console.error('handleWithdrawMember error', error);
        }
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center pt-20 bg-main-font bg-opacity-30"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-xl shadow-lg px-6 py-6 flex flex-col items-center justify-center gap-8 min-w-[400px] min-h-[300px] animate-slideDown">
                <div className="flex-shrink-0">
                    <Image
                        src="/assets/question_mark_icon.png"
                        width={100}
                        height={100}
                        alt="modal alert icon"
                        priority
                        fetchPriority="high"
                    />
                </div>

                <p className="text-base text-main-font flex-0 whitespace-pre-line text-center">
                    {message}
                </p>

                {
                    type === 'process' &&
                    <div className="flex w-full items-center justify-center">
                        <input
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full h-14 px-6 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors text-main-font placeholder-sub-font"
                        />
                    </div>
                }

                {
                    type === 'process'
                        ?
                        (
                            <div className="flex flex-row w-full items-center justify-center gap-3">
                                <button
                                    name="noti modal no button"
                                    className="w-full px-6 py-3 border-2 rounded-xl hover:bg-selected-bg hover:border-selected-line"
                                    onClick={onClose}
                                >
                                    취소
                                </button>
                                <button
                                    name="noti modal yes button"
                                    className="w-full px-6 py-3 border-2 rounded-xl hover:bg-selected-bg hover:border-selected-line selected:bg-selected-bg"
                                    onClick={handleWithdrawMember}
                                >
                                    확인
                                </button>
                            </div>
                        )
                        : (
                            <div className="flex flex-row w-full items-center justify-center gap-3">
                                <button
                                    name="noti modal yes button"
                                    className="w-full px-6 py-3 border-2 rounded-xl hover:bg-selected-bg hover:border-selected-line selected:bg-selected-bg"
                                    onClick={onClose}
                                >
                                    확인
                                </button>
                            </div>
                        )
                }
            </div>
        </div>
    );
}
