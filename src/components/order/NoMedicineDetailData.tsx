import Image from "next/image";

export default function NoMedicineDetailData() {
    return (
        <div className="flex flex-col h-full items-center justify-center">
            <Image
                src="/assets/med_icon.png"
                width={138}
                height={138}
                alt="ai selected med info"
                className="mb-[24px]"
                priority
                fetchPriority="high"
            />
            <div className="text-center text-sub-font whitespace-nowrap">원하는 약품을 선택해<br />주문 가능한 수량을 확인하세요!</div>
        </div>
    );
}