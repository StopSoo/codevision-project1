interface ButtonProps {
    text: string;
    height: number;
}

export default function Button({ text, height }: ButtonProps) {
    const handleClick = () => {};

    return (
        <button
            onClick={handleClick}
            style={{ height: `${height}px` }}
            className={"flex flex-row w-full bg-[#01C78D] font-bold font-recipe text-[24px] text-[#ffffff] items-center justify-center px-[40px] py-[20px] rounded-[20px] outline-none"}>
            {text}
        </button>
    );
}