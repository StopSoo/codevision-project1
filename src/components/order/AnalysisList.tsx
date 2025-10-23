import { useAnalysisStore, useSelectedMedStore } from "@/store/store";
import { Suspense, useEffect } from "react";
import { DataType } from "@/types/medicine";
import DataListSkeleton from "../skeleton/DataListSkeleton";

// 목데이터
const dayData: DataType[] = [
    {
        sort: 'day',
        name: "스틸렌투엑스정 90mg",
        company: "동아에스티(주)",
        code: "642507290",
        detail: [
            ['30T', 8],
            ['400T', 20],
        ],
    },
    {
        sort: 'day',
        name: "우루사정 100mg",
        company: "대웅제약",
        code: "642502040",
        detail: [
            ['30T (병)', 8],
            ['100T (PTP)', 3],
        ],
    },
    {
        sort: 'day',
        name: "판콜에스내복액 30ml",
        company: "동화약품(주)",
        code: "642506512",
        detail: [
            ['30T', 10]
        ],
    },
];

const weekData: DataType[] = [
    {
        sort: 'week',
        name: "우루사정 100mg",
        company: "대웅제약",
        code: "642502040",
        detail: [
            ['30T (병)', 8],
            ['100T (PTP)', 3],
        ],
    },
    {
        sort: 'week',
        name: "판콜에스내복액 30ml",
        company: "동화약품(주)",
        code: "642506512",
        detail: [
            ['30T', 10]
        ],
    },
];

const monthData: DataType[] = [
    {
        sort: 'month',
        name: "스틸렌투엑스정 90mg",
        company: "동아에스티(주)",
        code: "642507290",
        detail: [
            ['30T', 8],
            ['400T', 20],
        ],
    },
    {
        sort: 'month',
        name: "판콜에스내복액 30ml",
        company: "동화약품(주)",
        code: "642506512",
        detail: [
            ['30T', 10]
        ],
    },
];

export default function AnalysisList() {
    const { click, result, setResult, filterList, setFilterList } = useAnalysisStore();
    const { selectedNumber, setSelectedNumber } = useSelectedMedStore();

    useEffect(() => {
        const newResult = [
            ...(filterList.includes('day') ? dayData : []),
            ...(filterList.includes('week') ? weekData : []),
            ...(filterList.includes('month') ? monthData : []),
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

            <div className="flex flex-row justify-start h-8 gap-3 mb-6">
                <label className="flex flex-row items-center justify-center gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        name="day"
                        checked={filterList.includes('day')}
                        onChange={() => setFilterList('day')}
                        className="w-6 h-6 accent-main-logo"
                    />
                    <span className="text-main-font font-medium">일별</span>
                </label>
                <label className="flex flex-row items-center justify-center gap-3 cursor-pointer w-50%">
                    <input
                        type="checkbox"
                        name="week"
                        checked={filterList.includes('week')}
                        onChange={() => setFilterList('week')}
                        className="w-6 h-6 accent-main-logo"
                    />
                    <span className="text-main-font font-medium">주별</span>
                </label>
                <label className="flex flex-row items-center justify-center gap-3 cursor-pointer w-50%">
                    <input
                        type="checkbox"
                        name="month"
                        checked={filterList.includes('month')}
                        onChange={() => setFilterList('month')}
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
                                                        : "text-xs text-main-logo"
                                            }
                                        >
                                            {analysis.sort === 'day'
                                                ? "today"
                                                : analysis.sort === 'week'
                                                    ? "week"
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