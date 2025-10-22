import Area from "@/components/common/Area";
import Layout from "@/components/layout/Layout";
import AnalysisList from "@/components/order/AnalysisList";
import MedicineDetail from "@/components/order/MedicineDetail";
import Cart from "@/components/order/Cart";
import Image from "next/image";

import { useAnalysisStore, useMedRankingStore, useSelectedMedStore } from "@/store/store";
import MedRanking from "@/components/order/MedRanking";
// API 구조 보고 수정할 것
const medicineDetailData = {
    name: "스틸렌투엑스정 90mg",
    unit: "30T",
    dosage: "90mg",
    manufacturer: "대웅제약",
    code: "642507290",
    variants: [
        {
            name: "도매상 A",
            price: 6150,
            margin: "+ 10.3%",
            available: 40,
            unit: "30T"
        },
        {
            name: "도매상 B",
            price: 6150,
            margin: "+ 7.1%",
            available: 35,
            unit: "30T"
        },
        {
            name: "도매상 C",
            price: 6150,
            margin: "+ 5.7%",
            available: 80,
            unit: "30T"
        }
    ]
};

export default function Order() {
    const { click: clickAnalysis } = useAnalysisStore();
    const { click: clickMedRanking } = useMedRankingStore();
    const { selectedNumber: selectedMedNumber } = useSelectedMedStore();

    return (
        <Layout>
            <div className="flex flex-row space-x-6 h-screen">
                <Area size='s' hasHeader={false}>
                    {
                        clickAnalysis
                            ? <AnalysisList />
                            : (
                                clickMedRanking
                                    ? <MedRanking />
                                    : <div className="flex flex-col h-full items-center justify-center mx-[17px]">
                                        <Image
                                            src="/assets/analysis_icon.png"
                                            width={138}
                                            height={138}
                                            alt="ai todays order logo"
                                            className="mb-[24px]"
                                            priority
                                        />
                                        <div className="text-center text-sub-font whitespace-nowrap">[오늘의 주문] 버튼을 눌러<br />AI가 분석한<br />예상 주문 목록을 확인하세요!</div>
                                    </div>
                            )
                    }
                </Area>
                <Area size='default' hasHeader={true} title={"약품 담기"}>
                    {
                        selectedMedNumber !== null
                            ? <MedicineDetail medicine={medicineDetailData} />
                            : <div className="flex flex-col h-full items-center justify-center">
                                <Image
                                    src="/assets/med_icon.png"
                                    width={138}
                                    height={138}
                                    alt="ai selected med info"
                                    className="mb-[24px]"
                                    priority
                                />
                                <div className="text-center text-sub-font whitespace-nowrap">원하는 약품을 선택해<br />주문 가능한 수량을 확인하세요!</div>
                            </div>
                    }
                </Area>
                <Area size='m' hasHeader={true} title={"장바구니"}>
                    <Cart />
                </Area>
            </div>
        </Layout>
    )
}