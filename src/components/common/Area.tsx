import Button from "./Button";

interface AreaProps {
    size: 's' | 'm' | 'l' | 'xl';
    hasHeader: boolean;
    title?: string;
    children: React.ReactNode;
}

export default function Area({ size, hasHeader, title, children }: AreaProps) {
    if (size === 's') {
        return (
            <div className={`w-[250px] bg-white items-center p-[15px] rounded-[20px] outline-solid shadow-black-4`}>
                {
                    hasHeader
                        ? <div className="flex flex-row font-bold text-[30px] items-start">{title}</div>
                        : <Button text="오늘의 주문" height={70} />
                }
                <div className="w-full h-1 bg-gray-300 rounded-2xl my-[24px]" />
                {children}
            </div>
        );
    } else if (size === 'm') {
        return (
            <div className={`w-[344px] bg-white items-center p-[15px] rounded-[20px] outline-solid shadow-black-4`}>
                {
                    hasHeader
                        ? <div className="flex flex-row font-bold text-[30px] items-start">{title}</div>
                        : <Button text="오늘의 주문" height={70} />
                }
                <div className="w-full h-1 bg-gray-300 rounded-2xl my-[24px]" />
                {children}
            </div>
        );
    } else if (size === 'l') {
        return (
            <div className={`w-[656px] bg-white items-center p-[15px] rounded-[20px] outline-solid shadow-black-4`}>
                {
                    hasHeader
                        ? <div className="flex flex-row font-bold text-[30px] items-start">{title}</div>
                        : <Button text="오늘의 주문" height={70} />
                }
                <div className="w-full h-1 bg-gray-300 rounded-2xl my-[24px]" />
                {children}
            </div>
        );
    } else if (size === 'xl') {
        return (
            <div className={`w-[1306px] bg-white items-center p-[15px] rounded-[20px] outline-solid shadow-black-4`}>
                {
                    hasHeader
                        ? <div className="flex flex-row font-bold text-[30px] items-start">{title}</div>
                        : <Button text="오늘의 주문" height={70} />
                }
                <div className="w-full h-1 bg-gray-300 rounded-2xl my-[24px]" />
                {children}
            </div>
        );
    }

}