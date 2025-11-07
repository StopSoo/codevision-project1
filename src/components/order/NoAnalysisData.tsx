import Image from "next/image";

export default function NoAnalysisData() {
    return (
        <div className="flex flex-col h-full items-center justify-center mx-[20.5px]">
            <Image
                src="/assets/analysis_icon.png"
                width={138}
                height={138}
                alt="ai todays order logo"
                className="mb-[24px]"
                priority
                fetchPriority="high"
            />
            <div className="text-center text-sub-font whitespace-nowrap">
                [오늘의 주문] 버튼을 눌러<br />AI가 분석한 예상 주문 목록과<br />요즘 약국의 약품 주문 랭킹을<br />확인하세요!
            </div>
        </div>
    );
}