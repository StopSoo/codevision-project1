import Area from "@/components/common/Area";
import Layout from "@/components/layout/Layout";
import PredictItemList from "@/components/predictItem/PredictItemList";
import PredictPharmacyList from "@/components/predictItem/PredictPharmacyList";


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