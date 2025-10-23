import { usePharmacyMemberStore, useSelectedMemberStore } from "@/store/store";
import { PharmacyMemberType } from "@/types/wholesaler/predictItem";
import { useEffect } from "react";

// 목데이터
const memberData: PharmacyMemberType[] = [
    {
        name: "가나다라 약국",
        country: 'Seoul',
        signUpDate: '2025-01-01',
    },
    {
        name: "마바사 약국",
        country: 'Busan',
        signUpDate: '2025-01-01',
    },
    {
        name: "아자차카 약국",
        country: 'Incheon',
        signUpDate: '2025-01-01',
    },
    {
        name: "타파하 약국",
        country: 'Gwangju',
        signUpDate: '2025-01-01',
    },
];

export default function PharmacyList() {
    const { result, setResult } = usePharmacyMemberStore();
    const { selectedNumber, setSelectedNumber } = useSelectedMemberStore(); // 선택 약국

    useEffect(() => {
        // API 연결 시 수정
        setResult(memberData);
    }, [setResult]);

    return (
        <div className="h-full flex flex-col">
            <div className="bg-gray-200 grid grid-cols-3 gap-4 p-4 text-center font-medium text-main-font rounded-t-lg">
                <span>약국명</span>
                <span>지역</span>
                <span>가입 일자</span>
            </div>

            {/* suspense 적용 체크 - 적용하려면 skeleton 컴포넌트 제작 필수 */}
            {
                <div className="flex-1 overflow-y-auto">
                    {
                        result.map((predictItem, index) =>
                            <div
                                key={index}
                                className={(index !== selectedNumber)
                                    ? "flex-1 flex flex-row w-full items-center justify-start p-4 space-2 gap-4 overflow-y-auto bg-gray-50 border-2 hover:bg-selected-bg hover:border-selected-line transition-colors"
                                    : "flex-1 flex flex-row w-full items-center justify-start p-4 space-2 gap-4 overflow-y-auto bg-selected-bg border-2 border-selected-line transition-colors"
                                }>
                                <button
                                    onClick={() => setSelectedNumber(index)}
                                    className="w-full"
                                >
                                    <div
                                        className="grid grid-cols-3 gap-4 py-4 bg-white text-sm whitespace-nowrap text-center">
                                        <span>{predictItem.name}</span>
                                        <span>{predictItem.country}</span>
                                        <span>{predictItem.signUpDate}</span>
                                    </div>
                                </button>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
}