import Area from "@/components/common/Area";
import Layout from "@/components/layout/Layout";
import PredictItemList from "@/components/predictItem/PredictItemList";
import PredictPharmacyList from "@/components/predictItem/PredictPharmacyList";

export default function PredictPharmacy() {
    return (
        <Layout>
            <div className="flex flex-row space-x-6 h-screen">
                <Area size='l' hasHeader={true} title={"약국 회원 선택"}>
                    <PredictItemList />
                </Area>
                <Area size='default' hasHeader={true} title={"의약품 주문량 분석"}>
                    <PredictPharmacyList />
                </Area>
            </div>
        </Layout>
    )
}