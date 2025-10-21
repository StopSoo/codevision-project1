import { usePredictItemStore } from "@/store/store";
import { PredictMedicineType } from "@/types/predictItem";
import { useEffect } from "react";

// 목데이터
const predictData: PredictMedicineType[] = [
    {
        name: "타이레놀 500mg 10T",
        quantity: 500,
        price: 2000000,
        date: '2025-01-01',
    },
    {
        name: "스티렌투엑스정 90mg",
        quantity: 100,
        price: 6000000,
        date: '2025-01-01',
    },
    {
        name: "판콜에스내복액 30ml",
        quantity: 250,
        price: 3600000,
        date: '2025-01-01',
    },
    {
        name: "우루사정 100mg",
        quantity: 80,
        price: 1400000,
        date: '2025-01-01',
    },
    {
        name: "타이레놀 500mg 10T",
        quantity: 500,
        price: 2000000,
        date: '2025-01-01',
    },
];

export default function PredictPharmacyList() {
    const { result, setResult } = usePredictItemStore();

    useEffect(() => {
        // API 연결 시 수정
        setResult(predictData);
    }, [setResult]);

    return (
        <div className="h-full flex flex-col">
            <div className="bg-gray-200 grid grid-cols-4 gap-4 p-4 text-center font-medium text-main-font rounded-t-lg">
                <span>품목</span>
                <span>수량</span>
                <span>가격 총합</span>
                <span>주문 예상 일자</span>
            </div>

            {/* suspense 적용 체크 - 적용하려면 skeleton 컴포넌트 제작 필수 */}
            {
                <div className="flex-1 overflow-y-auto space-y-4">
                    {
                        result.map((predictItem, index) =>
                            <div
                                key={index}
                                className="flex-1 flex flex-row w-full items-center justify-start p-4 space-2 gap-4 overflow-y-auto bg-gray-50 rounded-b-lg"
                            >
                                <input
                                    type="checkbox"
                                    className="w-8 h-8 flex flex-col justify-start accent-main-color color-white"
                                />
                                <div key={index} className="w-full grid grid-cols-4 gap-4 p-4 bg-white text-center">
                                    <span>{predictItem.name}</span>
                                    <span>{predictItem.quantity}</span>
                                    <span>{predictItem.price.toLocaleString()}</span>
                                    <span>{predictItem.date}</span>
                                </div>
                            </div>
                        )
                    }
                </div>
            }
        </div>
    );
}