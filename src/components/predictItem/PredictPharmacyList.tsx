import { usePredictItemStore, usePredictPharmacyStore, useSelectedItemStore } from "@/store/store";
import { PredictPharmacyType } from "@/types/predictItem";
import Image from "next/image";
import { useEffect } from "react";

// 목데이터
const predictData: PredictPharmacyType[][] = [
    [{
        id: 1,
        name: "가톨릭 약국",
        quantity: 200,
        percentage: '99.2'
    },
    {
        id: 2,
        name: "나톨릭 약국",
        quantity: 100,
        percentage: '91.8',
    },
    {
        id: 3,
        name: "다톨릭 약국",
        quantity: 300,
        percentage: '78.1'
    },
    {
        id: 4,
        name: "라톨릭 약국",
        quantity: 500,
        percentage: '84.9'
    }],
    [{
        id: 1,
        name: "가나다라 약국",
        quantity: 200,
        percentage: '99.2'
    },
    {
        id: 2,
        name: "마바사 약국",
        quantity: 100,
        percentage: '91.8',
    },
    {
        id: 3,
        name: "아자차 약국",
        quantity: 320,
        percentage: '78.1'
    },
    {
        id: 4,
        name: "카타파하 약국",
        quantity: 500,
        percentage: '84.9'
    }],
    [{
        id: 1,
        name: "김수한무 약국",
        quantity: 900,
        percentage: '99.2'
    },
    {
        id: 2,
        name: "거북이와 약국",
        quantity: 100,
        percentage: '91.8',
    },
    {
        id: 3,
        name: "두루미 약국",
        quantity: 300,
        percentage: '78.1'
    },
    {
        id: 4,
        name: "삼천갑자 약국",
        quantity: 100,
        percentage: '84.9'
    }],
    [{
        id: 1,
        name: "시크릿가든 약국",
        quantity: 200,
        percentage: '99.2'
    },
    {
        id: 2,
        name: "상속자들 약국",
        quantity: 100,
        percentage: '91.8',
    },
    {
        id: 3,
        name: "신사의 품격 약국",
        quantity: 290,
        percentage: '78.1'
    },
    {
        id: 4,
        name: "뷰티 인사이드 약국",
        quantity: 400,
        percentage: '84.9'
    }],
];

export default function PredictPharmacyList() {
    const { result } = usePredictItemStore();
    const { medInfoList, setMedInfoList, getTotalQuantity } = usePredictPharmacyStore();
    const { selectedMedNumber } = useSelectedItemStore();

    useEffect(() => {
        if (selectedMedNumber !== null) {
            setMedInfoList(predictData[selectedMedNumber]);
        }
    }, [selectedMedNumber, setMedInfoList]);

    return (
        <div className="h-full flex flex-col">

            {/* suspense 적용 체크 - 적용하려면 skeleton 컴포넌트 제작 필수 */}
            {
                selectedMedNumber !== null
                    ? <div className="flex-1 overflow-y-auto space-y-4">
                        <div className="flex flex-col items-start text-xl text-main-color">
                            {result[selectedMedNumber].name}
                        </div>

                        <div className="flex flex-col items-end text-md text-unselected-font">
                            총 수량: {getTotalQuantity().toLocaleString()}
                        </div>

                        <div className="w-full flex flex-row items-center bg-gray-200 grid grid-cols-3 gap-4 p-4 text-center font-medium text-main-font rounded-t-lg">
                            <span>약국명</span>
                            <span>주문 수량</span>
                            <span>주문 확률</span>
                        </div>
                        {
                            medInfoList.map((predictItem, index) =>
                                <div
                                    key={index}
                                    className="flex-1 flex flex-row w-full items-center justify-start py-4 space-2 gap-4 overflow-y-auto bg-gray-50 rounded-b-lg"
                                >
                                    <div key={index} className="w-full grid grid-cols-3 gap-4 p-4 bg-white text-center">
                                        <span>{predictItem.name}</span>
                                        <span>{predictItem.quantity}</span>
                                        <span>{predictItem.percentage}</span>
                                    </div>
                                </div>
                            )
                        }
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