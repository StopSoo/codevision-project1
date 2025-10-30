import { getPredictOrderDetail } from "@/apis/predictItem";
import { usePredictItemStore, usePredictPharmacyStore, useSelectedItemStore } from "@/store/store";
import { PredictPharmacyType } from "@/types/wholesaler/predictItem";
import Image from "next/image";
import { useEffect } from "react";

export default function PredictPharmacyList() {
    const { result } = usePredictItemStore();
    const { medInfoList, setMedInfoList, getTotalQuantity } = usePredictPharmacyStore();
    const { selectedNumber: selectedMedNumber } = useSelectedItemStore();

    useEffect(() => {
        const handlePharmacyList = async () => {
            try {
                if (selectedMedNumber !== null) {
                    const result = await getPredictOrderDetail(selectedMedNumber);
                    if (result && "data" in result) {
                        console.log(result);
                        setMedInfoList(result.data.pharmacyList);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        handlePharmacyList();
    }, [selectedMedNumber]);

    return (
        <div className="h-full flex flex-col">

            {/* suspense 적용 체크 - 적용하려면 skeleton 컴포넌트 제작 필수 */}
            {
                selectedMedNumber !== null
                    ? <div className="flex-1 h-full flex flex-col overflow-y-auto">
                        <div className="flex flex-col items-start text-xl text-main-color">
                            {result.map((item) => {
                                if (item.predictId === selectedMedNumber) {
                                    return item.productName;
                                }
                            })}
                        </div>

                        <div className="flex flex-col items-end text-md text-unselected-font">
                            총 수량: {getTotalQuantity().toLocaleString()}
                        </div>

                        <div className="w-full flex flex-row items-center bg-gray-200 grid grid-cols-3 gap-4 p-4 text-center font-medium text-main-font rounded-t-lg">
                            <span>약국명</span>
                            <span>주문 수량</span>
                            <span>주문 확률 (%)</span>
                        </div>
                        <div className="flex-1 overflow-y-auto bg-gray-50">
                            {
                                medInfoList.map((predictItem, index) =>
                                    <div
                                        key={index}
                                        className="flex-1 flex flex-row w-full items-center justify-start p-4 space-2 gap-4 overflow-y-auto bg-gray-50 rounded-b-lg"
                                    >
                                        <div key={index} className="w-full grid grid-cols-3 gap-4 p-4 bg-white text-center">
                                            <span>{predictItem.workspace}</span>
                                            <span>{predictItem.expectedQty}</span>
                                            <span>{predictItem.probOrder}</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    : <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-b-lg py-4">
                        <div className="flex flex-col items-center">
                            <Image
                                src="/assets/pharmacy_icon.png"
                                width={150}
                                height={150}
                                alt="pharmacy icon"
                                className="mb-6"
                                priority
                            />
                        </div>
                    </div>
            }
        </div>
    );
}