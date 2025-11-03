import { useMedRankingStore, useSelectedMedStore } from "@/store/store";
import { Suspense, useCallback, useEffect, useState } from "react";
import DataListSkeleton from "../skeleton/DataListSkeleton";
import { getTodaysRanking } from "@/apis/pharmacy";

export default function MedRanking() {
    const { result, setResult } = useMedRankingStore();
    const { selectedNumber: selectedMedNumber, setSelectedNumber: setSelectedMedNumber } = useSelectedMedStore();

    const [listCount, setListCount] = useState(20);
    const [percent, setPercent] = useState(70);

    const handleMedRanking = useCallback(async () => {
        try {
            const ranking = await getTodaysRanking(listCount, percent);

            if (ranking?.items) {
                console.log(ranking.items);
                setResult(ranking.items);
            }
        } catch (error) {
            console.error(error);
        }
    }, [listCount, percent, setResult]);

    useEffect(() => {
        handleMedRanking();
    }, [listCount, percent, handleMedRanking]);

    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-col space-y-4 mb-6">
                <div className="text-main-font text-xl font-medium">
                    요즘 약국 랭킹
                </div>
                <div className="text-xs text-sub-font leading-relaxed whitespace-nowrap">
                    지난 1주일 간 주변약국 주문자가 가장 많이<br />주문한 약품부터 주문율 떨어지는 약품까지<br />순위로 정리했습니다.<br />
                </div>
                <div className="flex flex-row gap-2">
                    <div className="flex flex-row gap-1 items-center">
                        <span className="text-sm w-9">개수</span>
                        <select
                            value={listCount}
                            onChange={(e) => setListCount(Number(e.target.value))}
                            className="w-full max-w-[80px] h-12 px-3 py-3 border border-gray-300 text-sm text-main-font focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                        >
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                            <option value="50">50</option>
                            <option value="60">60</option>
                            <option value="70">70</option>
                            <option value="80">80</option>
                            <option value="90">90</option>
                            <option value="100">100</option>
                        </select>
                    </div>
                    <div className="flex flex-row gap-1 items-center">
                        <span className="text-sm w-9">상위</span>
                        <select
                            value={percent}
                            onChange={(e) => setPercent(Number(e.target.value))}
                            className="w-full max-w-[80px] h-12 px-3 py-3 border border-gray-300 text-sm text-main-font focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                        >
                            <option value="10">10%</option>
                            <option value="20">20%</option>
                            <option value="30">30%</option>
                            <option value="40">40%</option>
                            <option value="50">50%</option>
                            <option value="60">60%</option>
                            <option value="70">70%</option>
                            <option value="80">80%</option>
                            <option value="90">90%</option>
                            <option value="100">100%</option>
                        </select>
                    </div>
                </div>
            </div>

            <Suspense fallback={<DataListSkeleton />}>
                <div
                    className="flex-1 overflow-y-auto space-y-4 pr-2"
                    style={{ scrollbarGutter: "stable" }}
                >
                    {
                        result.map((data, index) =>
                            <button
                                area-label="med ranking"
                                key={index}
                                className={(data.medicineId !== selectedMedNumber)
                                    ? "w-full min-w-[225px] flex flex-col space-y-2 p-4 border border-gray-300 rounded-lg hover:border-selected-line hover:bg-selected-bg transition-colors"
                                    : "w-full min-w-[225px] flex flex-col space-y-2 p-4 border border-selected-line bg-selected-bg rounded-lg transition-colors"
                                }
                                onClick={() => setSelectedMedNumber(data.medicineId)}
                            >
                                <div className="flex flex-row items-center gap-3 text-sm font-medium text-main-font text-left">
                                    <span className="text-sub-color text-lg">{index + 1}</span>
                                    {data.productName}
                                </div>
                                <div className="flex flex-row text-sub-font justify-between gap-3 text-[10px] whitespace-nowrap">
                                    <span>{data.productCompany}</span>
                                    <span>보험코드 {data.insuranceCode}</span>
                                </div>
                                <div className="w-full h-[1px] bg-gray-300" />
                                <div className="flex flex-row flex-1 text-sub-font text-start text-sm font-medium">
                                    <span className="w-[40%]">주문율</span>
                                    <span
                                        className={
                                            data.orderRate > 90
                                                ? "w-[60%] text-point-positive"
                                                : data.orderRate > 80
                                                    ? "w-[60%] text-main-color"
                                                    : "w-[60%] text-point-negative"
                                        }
                                    >
                                        {data.orderRate}%
                                    </span>
                                </div>
                            </button>
                        )
                    }
                </div>
            </Suspense>
        </div >
    );
}