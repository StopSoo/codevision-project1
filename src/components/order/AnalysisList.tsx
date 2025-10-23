import { useAnalysisStore, useSelectedMedStore } from "@/store/store";
import { Suspense, useEffect, useState } from "react";
import { DataType } from "@/types/pharmacy/medicine";
import DataListSkeleton from "../skeleton/DataListSkeleton";
import { getTodaysOrderList } from "@/apis/order";

// 목데이터
// const dayData: DataType[] = [
//     {
//         sort: 'day',
//         medicineId: 2,
//         productName: "판콜에스내복액 30ml",
//         standard: '30',
//         unitQty: 30,
//         innerUnit: 'T',
//         containerUnit: '병',
//         insuranceCode: "642506512",
//         productCompany: "동화약품(주)",
//         expectedQty: 10,
//         probOrder: 0.87,
//         score: 0.932
//     },
//     {
//         sort: 'day',
//         medicineId: 2,
//         productName: "판콜에스내복액 30ml",
//         standard: '30',
//         unitQty: 30,
//         innerUnit: 'T',
//         containerUnit: '병',
//         insuranceCode: "642506512",
//         productCompany: "동화약품(주)",
//         expectedQty: 10,
//         probOrder: 0.87,
//         score: 0.932
//     },
// ];

// const dowData: DataType[] = [
//     {
//         sort: 'dow',
//         medicineId: 1,
//         productName: "스틸렌투엑스정 90mg",
//         standard: '90mg',
//         unitQty: 90,
//         innerUnit: 'mg',
//         containerUnit: '병',
//         insuranceCode: "642507290",
//         productCompany: "동아에스티(주)",
//         expectedQty: 24,
//         probOrder: 0.75,
//         score: 0.81
//     },
//     {
//         sort: 'dow',
//         medicineId: 1,
//         productName: "스틸렌투엑스정 90mg",
//         standard: '90mg',
//         unitQty: 90,
//         innerUnit: 'mg',
//         containerUnit: '병',
//         insuranceCode: "642507290",
//         productCompany: "동아에스티(주)",
//         expectedQty: 24,
//         probOrder: 0.75,
//         score: 0.81
//     },
//     {
//         sort: 'dow',
//         medicineId: 1,
//         productName: "스틸렌투엑스정 90mg",
//         standard: '90mg',
//         unitQty: 90,
//         innerUnit: 'mg',
//         containerUnit: '병',
//         insuranceCode: "642507290",
//         productCompany: "동아에스티(주)",
//         expectedQty: 24,
//         probOrder: 0.75,
//         score: 0.81
//     },
// ];

// const weekData: DataType[] = [
//     {
//         sort: 'dow',
//         medicineId: 1,
//         productName: "스틸렌투엑스정 90mg",
//         standard: '90mg',
//         unitQty: 90,
//         innerUnit: 'mg',
//         containerUnit: '병',
//         insuranceCode: "642507290",
//         productCompany: "동아에스티(주)",
//         expectedQty: 24,
//         probOrder: 0.75,
//         score: 0.81
//     },
//     {
//         sort: 'week',
//         medicineId: 2,
//         productName: "판콜에스내복액 30ml",
//         standard: '30',
//         unitQty: 30,
//         innerUnit: 'T',
//         containerUnit: '병',
//         insuranceCode: "642506512",
//         productCompany: "동화약품(주)",
//         expectedQty: 10,
//         probOrder: 0.87,
//         score: 0.932
//     },
//     {
//         sort: 'week',
//         medicineId: 1,
//         productName: "스틸렌투엑스정 90mg",
//         standard: '90mg',
//         unitQty: 90,
//         innerUnit: 'mg',
//         containerUnit: '병',
//         insuranceCode: "642507290",
//         productCompany: "동아에스티(주)",
//         expectedQty: 24,
//         probOrder: 0.75,
//         score: 0.81
//     },
// ];

// const monthData: DataType[] = [
//     {
//         sort: 'month',
//         medicineId: 1,
//         productName: "스틸렌투엑스정 90mg",
//         standard: '90mg',
//         unitQty: 90,
//         innerUnit: 'mg',
//         containerUnit: '병',
//         insuranceCode: "642507290",
//         productCompany: "동아에스티(주)",
//         expectedQty: 24,
//         probOrder: 0.75,
//         score: 0.81
//     },
//     {
//         sort: 'month',
//         medicineId: 2,
//         productName: "판콜에스내복액 30ml",
//         standard: '30',
//         unitQty: 30,
//         innerUnit: 'T',
//         containerUnit: '병',
//         insuranceCode: "642506512",
//         productCompany: "동화약품(주)",
//         expectedQty: 10,
//         probOrder: 0.87,
//         score: 0.932
//     },
// ];

export default function AnalysisList() {
    const { click, result, setResult, filterList, setFilterList } = useAnalysisStore();
    const { selectedNumber, setSelectedNumber } = useSelectedMedStore();

    const [dayData, setDayData] = useState<DataType[]>([]);
    const [dowData, setDowData] = useState<DataType[]>([]);
    const [weekData, setWeekData] = useState<DataType[]>([]);
    const [monthData, setMonthData] = useState<DataType[]>([]);

    const handleTodaysOrderList = async () => {
        try {
            const todayDate = new Date().toLocaleDateString();

            const [dayRes, dowRes, weekRes, monthRes] = await Promise.all([
                getTodaysOrderList({ date: todayDate, scope: 'DAY' }),
                getTodaysOrderList({ date: todayDate, scope: 'DOW' }),
                getTodaysOrderList({ date: todayDate, scope: 'WEEK' }),
                getTodaysOrderList({ date: todayDate, scope: 'MONTH' }),
            ]);

            if (dayRes) setDayData(dayRes.data);
            if (dowRes) setDowData(dowRes.data);
            if (weekRes) setWeekData(weekRes.data);
            if (monthRes) setMonthData(monthRes.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const newResult = [
            ...(filterList.includes('DAY') ? dayData : []),
            ...(filterList.includes('DOW') ? dowData : []),
            ...(filterList.includes('WEEK') ? weekData : []),
            ...(filterList.includes('MONTH') ? monthData : []),
        ];

        setResult(newResult);
    }, [click, filterList, setResult]);

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
                            result.map((analysis, index) =>
                                <button
                                    key={index}
                                    className={(index !== selectedNumber)
                                        ? "w-full flex flex-col space-y-2 p-4 border border-gray-300 rounded-lg hover:border-selected-line hover:bg-selected-bg transition-colors"
                                        : "w-full flex flex-col space-y-2 p-4 border border-selected-line bg-selected-bg rounded-lg transition-colors"
                                    }
                                    onClick={() => setSelectedNumber(index)}
                                >
                                    <div className="flex flex-row items-center font-medium text-main-font text-left gap-2">
                                        <p
                                            className={
                                                analysis.sort === 'day'
                                                    ? "text-xs text-sub-color"
                                                    : analysis.sort === 'week'
                                                        ? "text-xs text-hover-green"
                                                        : analysis.sort === 'dow'
                                                            ? "text-xs text-main-color"
                                                            : "text-xs text-main-logo"
                                            }
                                        >
                                            {analysis.sort === 'day'
                                                ? "today"
                                                : analysis.sort === 'week'
                                                    ? "week"
                                                    : analysis.sort === 'dow'
                                                        ? "day"
                                                        : "month"
                                            }
                                        </p>
                                        <p className="text-sm">{analysis.name}</p>
                                    </div>
                                    <div className="flex flex-row text-sub-font justify-between gap-3 text-[10px] whitespace-nowrap">
                                        <span>{analysis.company}</span>
                                        <span>보험코드 {analysis.code}</span>
                                    </div>
                                    <div className="w-full h-[1px] bg-gray-300" />
                                    <div className="flex flex-row flex-1 text-sub-font text-center text-[10px] font-medium">
                                        <span className="w-[50%]">단위</span>
                                        <span className="w-[50%]">수량</span>
                                    </div>
                                    {
                                        analysis.detail.map((d: [string, number], index: number) => (
                                            <div key={index} className="flex flex-row flex-1 text-main-font text-center text-[11px]">
                                                <span className="w-[50%]">{d[0]}</span>
                                                <span className="w-[50%]">{d[1]}</span>
                                            </div>
                                        ))
                                    }
                                </button>
                            )
                        }
                    </div>
                }
            </Suspense>
        </div >
    );
}