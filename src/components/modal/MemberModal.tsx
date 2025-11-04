import { useMemberModalStore, useLogoutModalStore } from "@/store/store";
import { useRouter } from "next/router";

interface MemberModalProps {
    onClose: () => void;
}

export default function MemberModal({ onClose }: MemberModalProps) {

    const { setIsModalClose } = useMemberModalStore();
    const { setIsModalOpen: setIsLogoutModalOpen } = useLogoutModalStore();
    const router = useRouter();

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // 모달 이외 영역 클릭 시 모달창 종료
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleLogout = () => {
        setIsModalClose();
        setIsLogoutModalOpen(); // 로그아웃 알림창
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-end pt-20 mt-2 mr-[66px]"
            onClick={handleBackdropClick}
        >
            <div className="bg-main-bg rounded-xl shadow-lg px-6 py-2 flex flex-col items-center justify-center min-w-[200px] min-h-[100px] animate-slideDown">
                <button
                    name="header member modal mypage button"
                    className="flex-shrink-0"
                    onClick={() => {
                        onClose();
                        router.push('/mypage');
                    }}
                >
                    마이페이지
                </button>
                <div className="w-full h-1 bg-gray-300 rounded-xl my-2" />
                <button
                    name="header member modal logout button"
                    className="flex-shrink-0"
                    onClick={handleLogout}
                >
                    로그아웃
                </button>
            </div>
        </div>
    );
}
