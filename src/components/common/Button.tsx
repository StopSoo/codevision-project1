interface ButtonProps {
    text: string;
    height: number;
    disabled?: boolean;
    onClick: () => void;
}

export default function Button({ text, height, disabled, onClick }: ButtonProps) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            style={{ height: `${height}px` }}
            className={!disabled
                ? "flex flex-row w-full bg-main-color font-medium font-recipe text-md md:text-2xl text-white whitespace-nowrap items-center justify-center px-[10px] md:px-[40px] py-[20px] rounded-xl outline-none shadow-md"
                : "flex flex-row w-full bg-sub-font font-medium font-recipe text-md md:text-2xl text-white whitespace-nowrap items-center justify-center px-[10px] md:px-[40px] py-[20px] rounded-xl outline-none shadow-md"
            }>
            {text}
        </button>
    );
}