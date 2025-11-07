import Area from "@/components/common/Area";
import Layout from "@/components/layout/Layout";
import Cart from "@/components/order/Cart";
import DataListSkeleton from "@/components/skeleton/DataListSkeleton";
import MedicineDetailSkeleton from "@/components/skeleton/MedicineDetailSkeleton";
import NoAnalysisData from "@/components/order/NoAnalysisData";
import NoMedicineDetailData from "@/components/order/NoMedicineDetailData";
import dynamic from "next/dynamic";

import { useAnalysisStore, useMedRankingStore, useSelectedMedStore } from "@/store/store";

const AnalysisList = dynamic(() => import("@/components/order/AnalysisList"), {
    loading: () => <DataListSkeleton />,
    ssr: false
});

const MedRanking = dynamic(() => import("@/components/order/MedRanking"), {
    loading: () => <DataListSkeleton />,
    ssr: false
});

const MedicineDetail = dynamic(() => import("@/components/order/MedicineDetail"), {
    loading: () => <MedicineDetailSkeleton />,
    ssr: false
});

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
                            : clickMedRanking
                                ? <MedRanking />
                                : <NoAnalysisData />

                    }
                </Area>

                <Area size='default' hasHeader={true} title={"약품 담기"}>
                    {
                        selectedMedNumber !== null
                            ? <MedicineDetail />
                            : <NoMedicineDetailData />
                    }
                </Area>

                <Area size='m' hasHeader={true} title={"장바구니"}>
                    <Cart />
                </Area>
            </div>
        </Layout>
    )
}