import { useOrderItemStore, useOrderModalStore, usePredictItemStore, useSelectedItemStore } from "@/store/store";
import { PredictMedicineType } from "@/types/predictItem";
import { useEffect, useState } from "react";
import Button from "../common/Button";

// 목데이터
const predictData: PredictMedicineType[] = [
    {
        id: 1,
        name: "타이레놀 500mg 10T",
        unitPrice: 6150,
        quantity: 500,
        price: 3075000,
        date: '2025-01-01',
    },
    {
        id: 2,
        name: "스티렌투엑스정 90mg",
        unitPrice: 8000,
        quantity: 100,
        price: 800000,
        date: '2025-01-01',
    },
    {
        id: 3,
        name: "판콜에스내복액 30ml",
        unitPrice: 7500,
        quantity: 250,
        price: 1875000,
        date: '2025-01-01',
    },
    {
        id: 4,
        name: "우루사정 100mg",
        unitPrice: 9600,
        quantity: 80,
        price: 768000,
        date: '2025-01-01',
    },
];

export default function PredictItemList() {
    const { result, setResult, updateQuantity, updateTotalPrice } = usePredictItemStore();
    const [selectedList, setSelectedList] = useState<number[]>([]); // 주문용으로 선택한 항목의 인덱스 배열
    const [totalPrice, setTotalPrice] = useState(0); // 주문하기로 선택한 품목들의 가격 합

    const { orderedList, addToOrderedList } = useOrderItemStore();
    const { setSelectedNumber: setSelectedMedNumber } = useSelectedItemStore(); // 주문 예상 약국 렌더링용 인덱스
    const { setIsModalOpen } = useOrderModalStore();

    const handleChange = (index: number) => {
        setSelectedList(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        )
    }

    const handleOrder = () => {
        // 주문 내역에 물품들 추가
        selectedList.forEach((idx) => {
            const item = result[idx];
            if (item) {
                addToOrderedList(item);
            }
        })
        console.log(orderedList);
        setSelectedList([]);
        setSelectedMedNumber(null);
        setIsModalOpen();
    };

    const handleQuantityChange = (id: number, unitPrice: number, value: string) => {
        const numValue = Number(value);
        if (numValue > 0) {
            updateQuantity(id, numValue || 0);
            updateTotalPrice(id, unitPrice, numValue)
        }
    };

    useEffect(() => {
        // API 연결 시 수정
        setResult(predictData);
    }, [setResult]);

    useEffect(() => {
        // 선택한 품목의 가격 총합 계산
        const total = selectedList.reduce((total, idx) => total + result[idx].price, 0);
        setTotalPrice(total);
    }, [selectedList, result]);


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
                            <div
                                key={index}
                                className="flex-1 flex flex-row w-full items-center justify-start p-4 space-2 gap-4 overflow-y-auto bg-gray-50 rounded-b-lg"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedList.includes(index)}
                                    onChange={() => handleChange(index)}
                                    className="w-12 h-12 flex flex-col justify-start accent-main-logo"
                                />
                                <button
                                    key={index}
                                    onClick={() => setSelectedMedNumber(index)}
                                >
                                    <div key={index} className="w-full grid grid-cols-4 gap-4 py-4 bg-white text-sm whitespace-nowrap text-center">
                                        <span>{predictItem.name}</span>
                                        <div className="flex flex-row items-center justify-center px-10">
                                            <input
                                                type="number"
                                                min="1"
                                                placeholder="0"
                                                value={predictItem.quantity || ""}
                                                onChange={(e) => handleQuantityChange(predictItem.id, predictItem.unitPrice, e.target.value)}
                                                className="w-full py-1 border border-gray-300 rounded focus:outline-none focus:border-selected-line focus:bg-selected-bg text-center text-sm"
                                            />
                                        </div>
                                        <span>{predictItem.price.toLocaleString()}</span>
                                        <span>{predictItem.date}</span>
                                    </div>
                                </button>
                            </div>
                        )
                    }
                </div>
            }

            <div className="w-full h-1 bg-gray-300 rounded-xl my-[18px]" />
            <div className="flex flex-col gap-4">
                <div className="flex flex-row items-center justify-between px-2">
                    <span className="text-lg font-medium text-main-font">총 결제 금액</span>
                    <span className={totalPrice !== 0 ? "text-xl font-bold text-main-color" : "text-xl font-bold text-sub-font"}>
                        {totalPrice.toLocaleString()}원
                    </span>
                </div>
                <Button
                    text="선택한 품목 주문하기"
                    height={60}
                    disabled={selectedList.length === 0}
                    bgColor={selectedList.length !== 0 ? "main-color" : "sub-font"}
                    onClick={handleOrder}
                />
            </div>
        </div>
    );
}