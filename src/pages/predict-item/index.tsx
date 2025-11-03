import Area from "@/components/common/Area";
import Layout from "@/components/layout/Layout";
import PredictItemSkeleton from "@/components/skeleton/PredictItemSkeleton";
import dynamic from "next/dynamic";

const PredictItemList = dynamic(() => import("@/components/predictItem/PredictItemList"), {
    loading: () => <PredictItemSkeleton />,
    ssr: false
});

const PredictPharmacyList = dynamic(() => import("@/components/predictItem/PredictPharmacyList"), {
    loading: () => null,
    ssr: false
});

export default function PredictItem() {
    return (
        <Layout>
            <div className="flex flex-row space-x-6 h-screen">
                <Area size='default' hasHeader={true} title={"주문 예상 품목"}>
                    <PredictItemList />
                </Area>
                <Area size='l' hasHeader={true} title={"주문 예상 약국"}>
                    <PredictPharmacyList />
                </Area>
            </div>
        </Layout>
    )
}