import Area from "@/components/common/Area";
import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { useState } from "react";

const mockData = [
    "스틸렌투엑스정 90mg",
    "우루사정 100mg",
    "판콜에스내복액 30ml"
];

export default function Order() {
    const [hasAnalysis, setHasAnalysis] = useState(false);
    const [hasMedicine, setHasMedicine] = useState(false);
    const [hasList, setHasList] = useState(false);

    return (
        <Layout>
            <div className="flex flex-row space-x-6 h-screen">
                <Area size='s' hasHeader={false}>
                    {hasAnalysis
                        ? mockData.map((data, index) => <li key={index}>{data}</li>)
                        : <div className="flex flex-col h-full items-center justify-center">
                            <Image
                                src="/assets/icon1.png"
                                width={138}
                                height={138}
                                alt="ai todays order logo"
                                className="mb-[24px]"
                            />
                            <div className="text-center text-sub-font whitespace-nowrap">[오늘의 주문] 버튼을 눌러<br />AI가 분석한<br />예상 주문 목록을 확인하세요!</div>
                        </div>
                    }
                </Area>
                <Area size='default' hasHeader={true} title={"약품 담기"}>
                    {hasMedicine
                        ? mockData.map((data, index) => <li key={index}>{data}</li>)
                        : <div className="flex flex-col h-full items-center justify-center">
                            <Image
                                src="/assets/icon2.png"
                                width={138}
                                height={138}
                                alt="ai todays order logo"
                                className="mb-[24px]"
                            />
                            <div className="text-center text-sub-font whitespace-nowrap">원하는 약품을 선택해<br />주문 가능한 수량을 확인하세요!</div>
                        </div>
                    }
                </Area>
                <Area size='m' hasHeader={true} title={"장바구니"}>
                    {hasList
                        ? mockData.map((data, index) => <li key={index}>{data}</li>)
                        : <div className="flex flex-col h-full items-center justify-center">
                            <Image
                                src="/assets/icon3.png"
                                width={138}
                                height={138}
                                alt="ai todays order logo"
                                className="mb-[24px]"
                            />
                            <div className="text-center text-sub-font whitespace-nowrap">필요한 약품과 수량을 선택해<br />장바구니에 담아보세요!</div>
                        </div>
                    }
                </Area>
            </div>
        </Layout>
    );
}