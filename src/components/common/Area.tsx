import Button from "./Button";
import { useAnalysisStore, useSelectedMedStore } from "@/store/store";

interface AreaProps {
    size: 's' | 'm' | 'l' | 'xl' | 'default';
    hasHeader: boolean;
    title?: string;
    children: React.ReactNode;
}

export default function Area({ size, hasHeader, title, children }: AreaProps) {
    const sizeMap = { 's': 380, 'm': 530, 'l': 750, 'xl': 1300, 'default': 'full' };

    const { clickAnalysis, setClickAnalysis } = useAnalysisStore();
    const { selectedMedNumber, setSelectedMedNumber } = useSelectedMedStore();

    if (!clickAnalysis) {
        // 오늘의 주문 버튼을 통해 분석 내용을 끄면 다른 내용도 모두 off
        setSelectedMedNumber(null);
        // 장바구니도 끄기
    }

    if (sizeMap[size] !== 'full') {
        return (
            <div
                style={{ width: `${sizeMap[size]}px` }}
                className={"bg-white px-[15px] py-[30px] rounded-xl outline-solid shadow-lg flex flex-col h-full"}
            >
                {hasHeader ? (
                    <div className="flex flex-row font-bold text-2xl md:text-3xl items-start whitespace-nowrap">
                        {title}
                    </div>
                ) : (
                    <Button
                        text="오늘의 주문"
                        height={70}
                        onClick={setClickAnalysis}
                    />
                )}
                <div className="w-full h-1 bg-gray-300 rounded-xl my-[18px]" />
                <div className="flex-1 overflow-hidden">
                    {children}
                </div>
            </div>
        );
    } else {
        return (
            <div
                className="w-full bg-white px-[15px] py-[30px] rounded-xl outline-solid shadow-lg flex flex-col h-full"
            >
                {hasHeader ? (
                    <div className="flex flex-row font-medium text-2xl md:text-3xl items-start whitespace-nowrap">
                        {title}
                    </div>
                ) : (
                    <Button
                        text="오늘의 주문"
                        height={70}
                        onClick={() => setClickAnalysis()}
                    />
                )}
                <div className="w-full h-1 bg-gray-300 rounded-xl my-[18px]" />
                <div className="flex-1 overflow-hidden">
                    {children}
                </div>
            </div>
        );
    }
}