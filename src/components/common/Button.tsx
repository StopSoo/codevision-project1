interface ButtonProps {
    text: string;
    height: number;
}

export default function Button({ text, height }: ButtonProps) {
    const handleClick = () => {

    };

    return (
        <button
            onClick={handleClick}
            className={`flex flex-row w-full h-[${height}px] bg-[#01C78D] font-bold text-[24px] text-white items-center justify-center px-2.25 py-1.25 rounded-2xl`}>
            {text}
        </button>
    );
}