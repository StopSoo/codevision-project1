import { usePredictItemStore, useSelectedItemStore } from "@/store/store";
import { PredictMedicineType } from "@/types/predictItem";
import { useEffect, useState } from "react";

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

export default function PredictItemList() {
    const { result, setResult } = usePredictItemStore();
    const [selectedList, setSelectedList] = useState<number[]>([]); // 선택한 항목의 인덱스 배열
    // const { selectedMedNumber, setSelectedMedNumber } = useSelectedItemStore();

    const handleClick = (index: number) => {
        setSelectedList(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        )
    }

    useEffect(() => {
        console.log(selectedList);
    }, [selectedList]);

    useEffect(() => {
        // API 연결 시 수정
        setResult(predictData);
    }, [setResult]);

    return (
        <div className="h-full flex flex-col">
            <div className="bg-gray-200 grid grid-cols-4 gap-4 py-4 pl-16 pr-4 text-center font-medium text-main-font rounded-t-lg">
                <span>품목</span>
                <span>수량</span>
                <span>가격 총합</span>
                <span>주문 예상 일자</span>
            </div>

            {/* suspense 적용 체크 - 적용하려면 skeleton 컴포넌트 제작 필수 */}
            {
                <div className="flex-1 overflow-y-auto">
                    {
                        result.map((predictItem, index) =>
                            <button
                                key={index}
                                // onClick={}
                                className="flex-1 flex flex-row w-full items-center justify-start p-4 space-2 gap-4 overflow-y-auto bg-gray-50 rounded-b-lg"
                            >
                                <input
                                    type="checkbox"
                                    onClick={() => handleClick(index)}
                                    className="w-8 h-8 flex flex-col justify-start accent-main-logo"
                                />
                                <div key={index} className="w-full grid grid-cols-4 gap-4 py-4 bg-white text-center">
                                    <span>{predictItem.name}</span>
                                    <span>{predictItem.quantity}</span>
                                    <span>{predictItem.price.toLocaleString()}</span>
                                    <span>{predictItem.date}</span>
                                </div>
                            </button>
                        )
                    }
                </div>
            }
        </div>
    );
}