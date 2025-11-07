import DaumPostcode from "react-daum-postcode";
import { VscChromeClose } from "react-icons/vsc";

import { useMemberStore } from "@/store/store";

interface AddressModalProps {
    onClose: () => void; // 버튼 눌렀을 때의 동작 함수
}

export default function AddressModal({ onClose }: AddressModalProps) {
    const { setZipCode, setRoadAddress } = useMemberStore();

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    // 선택한 주소를 화면에 입력
    const onCompletePost = ({ zonecode, address }: { zonecode: string, address: string }) => {
        setZipCode(zonecode);
        setRoadAddress(address);
        onClose();
    }

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center pt-20 bg-main-font bg-opacity-30"
            onClick={handleBackdropClick}
        >
            <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-6 min-w-[500px] min-h-[600px] animate-slideDown">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex-1 flex-row w-full h-15 items-center font-bold text-xl md:text-3xl whitespace-nowrap">
                        주소 검색
                    </div>
                    <button
                        name="close modal button"
                        onClick={onClose}
                        className="text-gray-600 hover:text-red-600 hover:rotate-90 duration-300 transition-colors transition-transform"
                    >
                        <VscChromeClose size={40} />
                    </button>
                </div>
                <div className="w-full h-full">
                    <DaumPostcode
                        onComplete={onCompletePost}
                        style={{ height: "500px" }}
                    ></DaumPostcode>
                </div>
            </div>
        </div>
    );
}