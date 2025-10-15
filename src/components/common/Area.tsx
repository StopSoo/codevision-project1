import Button from "./Button";

interface AreaProps {
    size: 's' | 'm' | 'l' | 'xl' | 'default';
    hasHeader: boolean;
    title?: string;
    children: React.ReactNode;
}

export default function Area({ size, hasHeader, title, children }: AreaProps) {
    const sizeMap = { 's': 380, 'm': 530, 'l': 750, 'xl': 1300, 'default': 'full' };

    if (sizeMap[size] !== 'full') {
        return (
            <div
                style={{ width: `${sizeMap[size]}px` }}
                className={`bg-white items-center p-[15px] rounded-xl outline-solid shadow-lg`}
            >
                {hasHeader ? (
                    <div className="flex flex-row font-bold text-2xl md:text-3xl items-start whitespace-nowrap">
                        {title}
                    </div>
                ) : (
                    <Button text="오늘의 주문" height={70} />
                )}
                <div className="w-full h-1 bg-gray-300 rounded-xl my-[24px]" />
                {children}
            </div>
        );
    } else {
        return (
            <div
                className="w-full bg-white items-center p-[15px] rounded-xl outline-solid shadow-lg"
            >
                {hasHeader ? (
                    <div className="flex flex-row font-bold text-2xl md:text-3xl items-start whitespace-nowrap">
                        {title}
                    </div>
                ) : (
                    <Button text="오늘의 주문" height={70} />
                )}
                <div className="w-full h-1 bg-gray-300 rounded-xl my-[24px]" />
                {children}
            </div>
        );
    }
}