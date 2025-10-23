import { useMedRankingStore, useSelectedMedStore } from "@/store/store";
import { Suspense, useEffect } from "react";
import { DataType } from "@/types/pharmacy/medicine";
import DataListSkeleton from "../skeleton/DataListSkeleton";

// 목데이터
const analysisData: DataType[] = [
    {
        productName: "우루사정 100mg",
        productCompany: "대웅제약",
        insuranceCode: "642502040",
        score: '95.8%',
    },
    {
        productName: "스틸렌투엑스정 90mg",
        productCompany: "동아에스티(주)",
        insuranceCode: "642507290",
        score: '93.1%',
    },
    {
        productName: "판콜에스내복액 30ml",
        productCompany: "동화약품(주)",
        insuranceCode: "642506512",
        score: '90.2%',
    },
    {
        productName: "우루사정 100mg",
        productCompany: "대웅제약",
        insuranceCode: "642502040",
        score: '89.8%',
    },
    {
        productName: "스틸렌투엑스정 90mg",
        productCompany: "동아에스티(주)",
        insuranceCode: "642507290",
        score: '88.8%',
    },
    {
        productName: "판콜에스내복액 30ml",
        productCompany: "동화약품(주)",
        insuranceCode: "642506512",
        score: '85.4%',
    },
    {
        productName: "스틸렌투엑스정 90mg",
        productCompany: "동아에스티(주)",
        insuranceCode: "642507290",
        score: '82.1%',
    },
    {
        productName: "우루사정 100mg",
        productCompany: "대웅제약",
        insuranceCode: "642502040",
        score: '78.6%',
    },
];

export default function MedRanking() {
    const { click: clickMedRanking, result, setResult } = useMedRankingStore();
    const { selectedNumber: selectedMedNumber, setSelectedNumber: setSelectedMedNumber } = useSelectedMedStore();

    useEffect(() => {
        // API 연결 시 수정
        // 버튼 클릭 여부가 변경되었을 때 AI 분석 결과 리스트가 업데이트되도록
        setResult(analysisData);
    }, [clickMedRanking, setResult]);

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

            <Suspense fallback={<DataListSkeleton />}>
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
                                <div className="flex flex-row items-center gap-3 text-sm font-medium text-main-font text-left">
                                    <span className="text-sub-color text-lg">{index + 1}</span>
                                    {analysis.name}
                                </div>
                                <div className="flex flex-row text-sub-font justify-between gap-3 text-[10px] whitespace-nowrap">
                                    <span>{analysis.company}</span>
                                    <span>보험코드 {analysis.code}</span>
                                </div>
                                <div className="w-full h-[1px] bg-gray-300" />
                                <div className="flex flex-row flex-1 text-sub-font text-start text-sm font-medium">
                                    <span className="w-[40%]">주문율</span>
                                    <span
                                        className={index < result.length / 3 ? "w-[60%] text-point-positive" : index < result.length * 2 / 3 ? "w-[60%] text-main-color" : "w-[60%] text-point-negative"}
                                    >
                                        {analysis.percentage}
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