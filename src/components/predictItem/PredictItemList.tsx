import { usePredictItemStore, useSelectedItemStore } from "@/store/store";
import { useEffect } from "react";
import { getPredictOrder } from "@/apis/predictItem";

export default function PredictItemList() {
    const { result, setResult, updateQuantity, updateTotalPrice } = usePredictItemStore();

    const { selectedNumber: selectedMedNumber, setSelectedNumber: setSelectedMedNumber } = useSelectedItemStore(); // 선택한 약품의 id

    const handleQuantityChange = (id: number, value: string, totalPrice: number) => {
        const numValue = Number(value);
        if (numValue > 0) {
            updateQuantity(id, numValue || 0);
            updateTotalPrice(id, totalPrice)
        }
    };

    useEffect(() => {
        const handlePredictOrderList = async () => {
            try {
                const result = await getPredictOrder(1, 10);

                if (result) {
                    console.log(result[0].items);
                    const items = result[0].items;
                    setResult(items);
                }
            } catch (error) {
                console.error(error);
            }
        };
        // API 연동
        handlePredictOrderList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(selectedMedNumber);
    }, [selectedMedNumber]);

    return (
        <div className="h-full flex flex-col">
            <div className="bg-gray-200 grid grid-cols-4 gap-4 py-4 px-4 text-center font-medium text-main-font rounded-t-lg">
                <span>품목</span>
                <span>수량</span>
                <span>가격 총합</span>
                <span>주문 예상 일자</span>
            </div>

            {/* suspense 적용 체크 - 적용하려면 skeleton 컴포넌트 제작 필수 */}
            {
                <div className="flex-1 overflow-y-auto bg-gray-50">
                    {
                        result.map((predictItem, index) =>
                            <div
                                key={predictItem.medicineId}
                                className="flex-1 flex flex-row w-full items-center justify-start p-4 space-2 gap-4 overflow-y-auto rounded-b-lg"
                            >
                                <button
                                    key={index}
                                    onClick={() => setSelectedMedNumber(predictItem.predictId)}
                                >
                                    <div
                                        key={index}
                                        className={
                                            predictItem.predictId === selectedMedNumber
                                                ? "flex flex-row items-center justify-center w-full grid grid-cols-4 gap-4 py-4 bg-selected-bg text-sm border-2 border-selected-line whitespace-nowrap text-start"
                                                : "flex flex-row items-center justify-center w-full grid grid-cols-4 gap-4 py-4 bg-white text-sm border-2 border-white whitespace-nowrap text-start hover:bg-selected-bg hover:border-selected-line"
                                        }
                                    >
                                        <span className="ml-4">
                                            {predictItem.productName + ' ' + String(predictItem.unitQty) + predictItem.innerUnit}
                                        </span>
                                        <div className="flex flex-row items-center justify-center px-10">
                                            <input
                                                readOnly
                                                type="number"
                                                min="1"
                                                placeholder="0"
                                                value={predictItem.expectedQty || ""}
                                                onChange={(e) => handleQuantityChange(predictItem.medicineId, e.target.value, predictItem.totalPrice)}
                                                className="w-full py-1 border border-gray-300 rounded focus:outline-none focus:border-selected-line focus:bg-selected-bg text-center text-sm"
                                            />
                                        </div>
                                        <span className="text-center">{predictItem.totalPrice.toLocaleString()}</span>
                                        <span className="text-center">{predictItem.expectedOrderDate}</span>
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