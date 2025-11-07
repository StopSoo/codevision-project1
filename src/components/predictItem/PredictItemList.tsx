import { useCallback, useEffect } from "react";
import { getPredictOrder } from "@/apis/predictItem";
import { diffTime } from "@/utils/formatDate";

import { usePredictItemStore, useSelectedItemStore } from "@/store/store";

export default function PredictItemList() {
    const { result, setResult, updateQuantity, updateTotalPrice } = usePredictItemStore();
    const { selectedNumber: selectedMedNumber, setSelectedNumber: setSelectedMedNumber } = useSelectedItemStore(); // 선택한 약품의 id

    const todaysDate = new Date().toISOString().split('T')[0];

    const handlePredictOrderList = useCallback(async () => {
        try {
            const data = await getPredictOrder(1, 10);

            if (data) {
                const items = data[0].items;
                setResult(items);
            }
        } catch (error) {
            console.error(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        // API 연동
        if (result.length === 0) {
            handlePredictOrderList();
        }
        setSelectedMedNumber(null);
    }, [handlePredictOrderList, result.length, setSelectedMedNumber]);

    return (
        <div className="h-full flex flex-col">
            <div className="bg-gray-200 grid grid-cols-7 gap-4 py-4 px-4 text-center font-medium text-main-font rounded-t-lg">
                <span className="col-span-2">품목</span>
                <span className="col-span-1">수량</span>
                <span className="col-span-2">가격 총합</span>
                <span className="col-span-2">예상 주문 일자</span>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50">
                {
                    result.map((predictItem, index) =>
                        <div
                            key={predictItem.medicineId}
                            className="flex-1 flex flex-row w-full items-center justify-start p-4 space-2 gap-4 overflow-y-auto rounded-b-lg"
                        >
                            <button
                                name="predict item button"
                                key={index}
                                onClick={() => setSelectedMedNumber(predictItem.predictId)}
                            >
                                <div
                                    key={index}
                                    className={
                                        predictItem.predictId === selectedMedNumber
                                            ? "flex flex-row items-center justify-center w-full grid grid-cols-7 gap-4 py-4 bg-selected-bg text-sm border-2 border-selected-line whitespace-nowrap text-start"
                                            : "flex flex-row items-center justify-center w-full grid grid-cols-7 gap-4 py-4 bg-white text-sm border-2 border-white whitespace-nowrap text-start hover:bg-selected-bg hover:border-selected-line"
                                    }
                                >
                                    <span className="ml-4 col-span-2">
                                        {predictItem.productName + ' ' + String(predictItem.unitQty) + predictItem.innerUnit}
                                    </span>
                                    <div className="flex flex-row items-center justify-center col-span-1">
                                        <input
                                            readOnly
                                            type="number"
                                            min="1"
                                            placeholder="0"
                                            value={predictItem.expectedQty || ""}
                                            className="w-full py-1 border border-gray-300 rounded text-center text-sm focus:outline-none cursor-pointer"
                                        />
                                    </div>
                                    <span className="text-center col-span-2">{predictItem.totalPrice.toLocaleString()}</span>
                                    <span
                                        className={
                                            diffTime(todaysDate, predictItem.expectedOrderDate) <= 14
                                                ? "text-center text-point-negative col-span-2"
                                                : diffTime(todaysDate, predictItem.expectedOrderDate) <= 31
                                                    ? "text-center text-point-positive col-span-2"
                                                    : "text-center text-main-font col-span-2"
                                        }
                                    >
                                        {predictItem.expectedOrderDate}
                                    </span>
                                </div>
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    );
}