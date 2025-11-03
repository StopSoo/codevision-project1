import Button from "./Button";
import { useAnalysisStore, useMedRankingStore, useSelectedMedStore } from "@/store/store";

interface AreaProps {
    size: 's' | 'm' | 'l' | 'xl' | 'default';
    hasHeader: boolean;
    title?: string;
    children: React.ReactNode;
}

export default function Area({ size, hasHeader, title, children }: AreaProps) {
    const sizeMap = { 's': 380, 'm': 530, 'l': 750, 'xl': 1300, 'default': 'full' };

    const { setButtonOn: setAnalysisButtonOn, setButtonOff: setAnalysisButtonOff } = useAnalysisStore();
    const { setButtonOn: setMedButtonOn, setButtonOff: setMedButtonOff } = useMedRankingStore();
    const { setSelectedNumber: setSelectedMedNumber } = useSelectedMedStore();

    if (sizeMap[size] !== 'full') {
        return (
            <div
                style={{ width: `${sizeMap[size]}px` }}
                className={"bg-white px-[14px] py-[30px] min-w-[276.33px] rounded-xl outline-solid shadow-lg flex flex-col h-full"}
            >
                {hasHeader ? (
                    <div className="flex flex-row font-medium text-2xl md:text-3xl items-start whitespace-nowrap">
                        {title}
                    </div>
                ) : (
                    <div className="space-y-[18px]">
                        <Button
                            text="오늘의 주문"
                            height={70}
                            bgColor="main-color"
                            hoverBgColor="hover-green"
                            onClick={() => {
                                setSelectedMedNumber(null);
                                setAnalysisButtonOn();
                                setMedButtonOff();
                            }}
                        />
                        <Button
                            text="요즘 약국 랭킹"
                            height={70}
                            bgColor="main-logo"
                            hoverBgColor="hover-blue"
                            onClick={() => {
                                setSelectedMedNumber(null);
                                setAnalysisButtonOff();
                                setMedButtonOn();
                            }}
                        />
                    </div>
                )}
                <div className="h-1 bg-gray-300 rounded-xl my-[18px]" />
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
                {
                    hasHeader &&
                    <div className="flex flex-row font-medium text-2xl md:text-3xl items-start whitespace-nowrap">
                        {title}
                    </div>
                }
                <div className="w-full h-1 bg-gray-300 rounded-xl my-[18px]" />
                <div className="flex-1 overflow-hidden">
                    {children}
                </div>
            </div>
        );
    }
}