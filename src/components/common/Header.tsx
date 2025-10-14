import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";

interface HeaderProps {
    // 약국, 도매상 여부에 따른 헤더 속성 변경
    pharmacy: boolean;
};

export default function Header({ pharmacy }: HeaderProps) {
    const [username, setUsername] = useState("정지수");

    return (
        <header className="flex flex-row w-full h-[84px] items-center justify-between pl-[66px] pr-[66px]">
            <div className="flex flex-row gap-60">
                <div className="flex flex-row text-[50px] text-[#3B5892] font-bold gap-12 mr-5">
                    <Image
                        src="/assets/pharmacy-logo.png"
                        width={60}
                        height={60}
                        alt="medict desktop logo"
                        className="flex flex-row items-center"
                    />
                    Medict
                </div>

                {pharmacy
                    ? <nav className="flex items-center gap-y-24.25 font-bold text-[1.5rem] font-recipe !text-unselected-font">
                        <Link className="hover:text-[#01C78D]" href="/order">AI 오늘의 주문</Link>
                        <Link className="hover:text-[#01C78D]" href="/order-history">주문 내역</Link>
                    </nav>
                    :
                    <nav className="flex items-center font-bold text-[1.5rem] font-recipe text-unselected-font">
                        <Link className="hover:text-[#01C78D]" href="/order-item">주문 예상 품목</Link>
                    </nav>
                }
            </div>
            <div className="flex flex-row gap-2 font-bold text-[1.5rem]">
                <div>{username}</div>
                <div>님</div>
                <button>
                    <SlArrowDown width="35" height="35" />
                </button>
            </div>
        </header>
    );
}