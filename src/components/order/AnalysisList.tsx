import { useAnalysisStore, useSelectedMedStore } from "@/store/store";
import { Suspense, useCallback, useEffect } from "react";
import DataListSkeleton from "../skeleton/DataListSkeleton";
import { getTodaysOrderList } from "@/apis/pharmacy";

export default function AnalysisList() {
    const { click, result, setResult, dayData, setDayData, dowData, setDowData, weekData, setWeekData, monthData, setMonthData, filterList, setFilterList } = useAnalysisStore();
    const { selectedNumber, setSelectedNumber } = useSelectedMedStore();

    const handleTodaysOrderList = useCallback(async () => {
        try {
            const todayDate = new Date().toISOString().split('T')[0];

            const [dayRes, dowRes, weekRes, monthRes] = await Promise.all([
                getTodaysOrderList({ date: todayDate, scope: 'DAY' }),
                getTodaysOrderList({ date: todayDate, scope: 'DOW' }),
                getTodaysOrderList({ date: todayDate, scope: 'WEEK' }),
                getTodaysOrderList({ date: todayDate, scope: 'MONTH' }),
            ]);

            if (dayRes?.items) {
                const newDayData = dayRes.items.map((item) => ({
                    ...item,
                    sort: 'DAY'
                }));
                setDayData(newDayData);
                setResult(newDayData); // 일별 필터링이 기본값
            }
            if (dowRes?.items) {
                const newDowData = dowRes.items.map((item) => ({
                    ...item,
                    sort: 'DOW'
                }));
                setDowData(newDowData);
            }
            if (weekRes?.items) {
                const newWeekData = weekRes.items.map((item) => ({
                    ...item,
                    sort: 'WEEK'
                }));
                setWeekData(newWeekData);
            }
            if (monthRes?.items) {
                const newMonthData = monthRes.items.map((item) => ({
                    ...item,
                    sort: 'MONTH'
                }));
                setMonthData(newMonthData);
            }
        } catch (error) {
            console.error(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const newResult = [
            ...(filterList.includes('DAY') ? dayData : []),
            ...(filterList.includes('DOW') ? dowData : []),
            ...(filterList.includes('WEEK') ? weekData : []),
            ...(filterList.includes('MONTH') ? monthData : []),
        ];
        setResult(newResult);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [click, filterList, dayData, dowData, weekData, monthData]);

    useEffect(() => {
        if (result.length === 0) {
            handleTodaysOrderList();
        }
    }, [result.length, handleTodaysOrderList]);

    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-col space-y-4 mb-6">
                <div className="text-main-font text-xl font-medium">
                    AI 분석 결과
                </div>
                <div className="text-xs text-sub-font leading-relaxed whitespace-nowrap">
                    지난 1주일 간 판매된 약품을 분석해<br />오늘 주문해야 할 품목을 선정했습니다.<br />
                </div>
            </div>

            <div className="flex flex-row grid grid-cols-2 justify-start h-16 gap-3 mb-4">
                <label className="flex flex-row items-center justify-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="DAY"
                        checked={filterList.includes('DAY')}
                        onChange={() => setFilterList('DAY')}
                        className="w-6 h-6 accent-main-logo"
                    />
                    <span className="text-main-font font-medium">일별</span>
                </label>
                <label className="flex flex-row items-center justify-start gap-3 cursor-pointer w-50%">
                    <input
                        type="checkbox"
                        name="DOW"
                        checked={filterList.includes('DOW')}
                        onChange={() => setFilterList('DOW')}
                        className="w-6 h-6 accent-main-logo"
                    />
                    <span className="text-main-font font-medium">요일별</span>
                </label>
                <label className="flex flex-row items-center justify-start gap-3 cursor-pointer w-50%">
                    <input
                        type="checkbox"
                        name="WEEK"
                        checked={filterList.includes('WEEK')}
                        onChange={() => setFilterList('WEEK')}
                        className="w-6 h-6 accent-main-logo"
                    />
                    <span className="text-main-font font-medium">주별</span>
                </label>
                <label className="flex flex-row items-center justify-start gap-3 cursor-pointer w-50%">
                    <input
                        type="checkbox"
                        name="MONTH"
                        checked={filterList.includes('MONTH')}
                        onChange={() => setFilterList('MONTH')}
                        className="w-6 h-6 accent-main-logo"
                    />
                    <span className="text-main-font font-medium">월별</span>
                </label>
            </div>

            <Suspense fallback={<DataListSkeleton />}>
                {
                    <div
                        className="flex-1 overflow-y-auto space-y-4 pr-2"
                        style={{ scrollbarGutter: "stable" }}
                    >
                        {
                            result.length === 0
                                ? <DataListSkeleton />
                                : result.map((analysis, index) =>
                                    <button
                                        key={index}
                                        className={(analysis.medicineId !== selectedNumber)
                                            ? "w-full min-w-[225px] flex flex-col space-y-2 p-4 border border-gray-300 rounded-lg hover:border-selected-line hover:bg-selected-bg transition-colors"
                                            : "w-full min-w-[225px] flex flex-col space-y-2 p-4 border border-selected-line bg-selected-bg rounded-lg transition-colors"
                                        }
                                        onClick={() => setSelectedNumber(analysis.medicineId)}
                                    >
                                        <div className="flex flex-row items-center font-medium text-main-font text-left gap-2">
                                            <p
                                                className={
                                                    analysis.sort === 'DAY'
                                                        ? "text-xs text-sub-color"
                                                        : analysis.sort === 'WEEK'
                                                            ? "text-xs text-hover-green"
                                                            : analysis.sort === 'DOW'
                                                                ? "text-xs text-main-color"
                                                                : "text-xs text-main-logo"
                                                }
                                            >
                                                {
                                                    analysis.sort === 'DAY'
                                                        ? "today"
                                                        : analysis.sort === 'WEEK'
                                                            ? "week"
                                                            : analysis.sort === 'DOW'
                                                                ? "day"
                                                                : "month"
                                                }
                                            </p>
                                            <p className="text-sm">{analysis.productName}</p>
                                        </div>
                                        <div className="flex flex-row text-sub-font justify-between gap-3 text-[10px] whitespace-nowrap">
                                            <span>{analysis.productCompany}</span>
                                            <span>보험코드 {analysis.insuranceCode}</span>
                                        </div>
                                        <div className="w-full h-[1px] bg-gray-300" />
                                        <div className="flex flex-row flex-1 text-sub-font text-center text-[10px] font-medium">
                                            <span className="w-[50%]">단위</span>
                                            <span className="w-[50%]">수량</span>
                                        </div>

                                        <div className="flex flex-row flex-1 text-main-font text-center text-[11px]">
                                            <span className="w-[50%]">{String(analysis.unitQty) + analysis.innerUnit} {analysis.containerUnit ? `(${analysis.containerUnit})` : null}</span>
                                            <span className="w-[50%]">{analysis.expectedQty}</span>
                                        </div>
                                    </button>
                                )
                        }
                    </div>
                }
            </Suspense>
        </div >
    );
}