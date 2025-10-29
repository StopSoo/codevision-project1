import Area from "@/components/common/Area";
import Layout from "@/components/layout/Layout";
import AnalysisList from "@/components/order/AnalysisList";
import MedicineDetail from "@/components/order/MedicineDetail";
import Cart from "@/components/order/Cart";
import Image from "next/image";

import { useAnalysisStore, useMedRankingStore, useSelectedMedStore } from "@/store/store";
import MedRanking from "@/components/order/MedRanking";

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
                                    : <div className="flex flex-col h-full items-center justify-center mx-[20.5px]">
                                        <Image
                                            src="/assets/analysis_icon.png"
                                            width={138}
                                            height={138}
                                            alt="ai todays order logo"
                                            className="mb-[24px]"
                                            priority
                                        />
                                        <div className="text-center text-sub-font whitespace-nowrap">
                                            [오늘의 주문] 버튼을 눌러<br />AI가 분석한 예상 주문 목록과<br />요즘 약국의 약품 주문 랭킹을<br />확인하세요!
                                        </div>
                                    </div>
                            )
                    }
                </Area>
                <Area size='default' hasHeader={true} title={"약품 담기"}>
                    {
                        selectedMedNumber !== null
                            ? <MedicineDetail />
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