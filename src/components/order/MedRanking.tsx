import { useAnalysisStore, useSelectedMedStore } from "@/store/store";
import { useEffect } from "react";
import { DataType } from "@/types/medicine";

// 목데이터
const analysisData: DataType[] = [
    {
        name: "스틸렌투엑스정 90mg",
        company: "동아에스티(주)",
        code: "642507290",
        detail: [
            ['30T', 8],
            ['400T', 20],
        ],
    },
    {
        name: "우루사정 100mg",
        company: "대웅제약",
        code: "642502040",
        detail: [
            ['30T (병)', 8],
            ['100T (PTP)', 3],
        ],
    },
    {
        name: "판콜에스내복액 30ml",
        company: "동화약품(주)",
        code: "642506512",
        detail: [
            ['30T', 10]
        ],
    },
    {
        name: "스틸렌투엑스정 90mg",
        company: "동아에스티(주)",
        code: "642507290",
        detail: [
            ['30T', 8],
            ['400T', 20],
        ],
    },
    {
        name: "우루사정 100mg",
        company: "대웅제약",
        code: "642502040",
        detail: [
            ['30T (병)', 8],
            ['100T (PTP)', 3],
        ],
    },
    {
        name: "판콜에스내복액 30ml",
        company: "동화약품(주)",
        code: "642506512",
        detail: [
            ['30T', 10]
        ],
    },
    {
        name: "스틸렌투엑스정 90mg",
        company: "동아에스티(주)",
        code: "642507290",
        detail: [
            ['30T', 8],
            ['400T', 20],
        ],
    },
    {
        name: "우루사정 100mg",
        company: "대웅제약",
        code: "642502040",
        detail: [
            ['30T (병)', 8],
            ['100T (PTP)', 3],
        ],
    },
    {
        name: "판콜에스내복액 30ml",
        company: "동화약품(주)",
        code: "642506512",
        detail: [
            ['30T', 10]
        ],
    },
];

export default function MedRanking() {
    const { click: clickAnalysis, result, setResult } = useAnalysisStore();
    const { selectedMedNumber, setSelectedMedNumber } = useSelectedMedStore();

    useEffect(() => {
        // API 연결 시 수정
        // 버튼 클릭 여부가 변경되었을 때 AI 분석 결과 리스트가 업데이트되도록
        setResult(analysisData);
    }, [clickAnalysis, setResult]);

    return (
        <div className="h-full flex flex-col">
            <div className="flex flex-col space-y-4 mb-6">
                <div className="text-main-font text-xl font-medium">
                    요즘 약국 랭킹
                </div>
                <div className="text-xs text-sub-font leading-relaxed whitespace-nowrap">
                    지난 1주일 간 주변약국 주문자가 가장 많이<br />주문한 약품부터 주문율 떨어지는 약품까지<br />순위로 정리했습니다.<br />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {
                    result.map((analysis, index) =>
                        <button
                            key={index}
                            className={(index !== selectedMedNumber)
                                ? "w-full flex flex-col space-y-2 p-4 border border-gray-300 rounded-lg hover:border-selected-line hover:bg-selected-bg transition-colors"
                                : "w-full flex flex-col space-y-2 p-4 border border-selected-line bg-selected-bg rounded-lg transition-colors"
                            }
                            onClick={() => setSelectedMedNumber(index)}
                        >
                            <div className="flex flex-row items-start text-sm font-medium text-main-font text-left">
                                {analysis.name}
                            </div>
                            <div className="flex flex-row text-sub-font justify-between gap-3 text-[10px] whitespace-nowrap">
                                <span>{analysis.company}</span>
                                <span>보험코드 {analysis.code}</span>
                            </div>
                            <div className="w-full h-[1px] bg-gray-300" />
                            <div className="flex flex-row flex-1 text-sub-font text-center justify-around text-[10px] font-medium">
                                <span>단위</span>
                                <span>수량</span>
                            </div>
                            {
                                analysis.detail.map((d: [string, number], index: number) => (
                                    <div key={index} className="flex flex-row flex-1 text-main-font text-center justify-around text-[11px]">
                                        <span>{d[0]}</span>
                                        <span>{d[1]}</span>
                                    </div>
                                ))
                            }
                        </button>
                    )
                }
            </div>
        </div >
    );
}