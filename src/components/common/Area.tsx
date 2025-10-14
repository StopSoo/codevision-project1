import Button from "./Button";

interface AreaProps {
    size: 's' | 'm' | 'l' | 'xl';
    hasHeader: boolean;
    title?: string;
    children: React.ReactNode;
}

export default function Area({ size, hasHeader, title, children }: AreaProps) {
    const sizeMap = { 's': 250, 'm': 344, 'l': 656, 'xl': 1306 };

    return (
        <div
            style={{width: `${sizeMap[size]}px`}}
            className={`bg-[#ffffff] items-center p-[15px] rounded-[20px] outline-solid shadow-lg`}
        >
            {hasHeader ? (
                <div className="flex flex-row font-bold text-[30px] items-start">
                    {title}
                </div>
            ) : (
                <Button text="오늘의 주문" height={70} />
            )}
            <div className="w-full h-1 bg-gray-300 rounded-2xl my-[24px]" />
            {children}
        </div>
    );
}