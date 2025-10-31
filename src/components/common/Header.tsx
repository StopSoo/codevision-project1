import Image from "next/image";
import Link from "next/link";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { GiMedicines } from "react-icons/gi";
import { AiFillMedicineBox } from "react-icons/ai";
import { useRouter } from "next/router";

import { useMemberModalStore, useMemberStore } from "@/store/store";

interface HeaderProps {
    // 약국, 도매상 여부에 따른 헤더 속성 변경
    pharmacy: boolean;
};

export default function Header({ pharmacy }: HeaderProps) {
    const router = useRouter();
    const { name } = useMemberStore();
    const { isModalOpen, setIsModalOpen } = useMemberModalStore();

    const isActive = (path: string) => router.pathname === path;

    const handleClick = () => {
        setIsModalOpen();
    }

    return (
        <header className="flex flex-row w-full h-[100px] items-center justify-between pl-[66px] pr-[66px] shadow-md">
            <div className="flex flex-row gap-[30px] md:gap-[100px]">
                <div className="flex flex-row w-[600px] items-center justify-center text-main-logo font-bold gap-6 md:gap-10 mr-5" style={{ fontStyle: 'italic' }}>
                    <Image
                        src="/assets/pharmacy-logo.png"
                        width={60}
                        height={60}
                        alt="medict desktop logo"
                        className="flex flex-row items-center"
                    />
                    <span className="text-3xl md:text-5xl">Medict</span>
                </div>

                {
                    pharmacy
                        ? <nav className="w-full flex items-center gap-[20px] md:gap-[100px] font-medium text-lg md:text-2xl whitespace-nowrap">
                            <Link
                                className={`h-[84px] flex items-center transition-colors relative ${isActive('/order')
                                    ? 'text-main-color'
                                    : 'text-unselected-font hover:text-main-color'
                                    }`}
                                href="/order"
                            >
                                AI 오늘의 주문
                                {isActive('/order') && (
                                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-main-color"></span>
                                )}
                            </Link>
                            <Link
                                className={`h-[84px] flex items-center transition-colors relative ${isActive('/order-history')
                                    ? 'text-main-color'
                                    : 'text-unselected-font hover:text-main-color'
                                    }`}
                                href="/order-history"
                            >
                                주문 내역
                                {isActive('/order-history') && (
                                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-main-color"></span>
                                )}
                            </Link>
                        </nav>
                        :
                        <nav className="w-full flex items-center gap-[20px] md:gap-[100px] font-medium text-lg md:text-2xl whitespace-nowrap">
                            <Link
                                className={`h-[84px] flex items-center transition-colors relative ${isActive('/predict-item')
                                    ? 'text-main-color'
                                    : 'text-unselected-font hover:text-main-color'
                                    }`}
                                href="/predict-item"
                            >
                                주문 예상 품목
                                {isActive('/predict-item') && (
                                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-main-color"></span>
                                )}
                            </Link>
                            <Link
                                className={`h-[84px] flex items-center transition-colors relative ${isActive('/order-log')
                                    ? 'text-main-color'
                                    : 'text-unselected-font hover:text-main-color'
                                    }`}
                                href="/order-log"
                            >
                                주문 내역
                                {isActive('/order-log') && (
                                    <span className="absolute bottom-0 left-0 right-0 h-1 bg-main-color"></span>
                                )}
                            </Link>
                        </nav>
                }
            </div>

            <div className="flex flex-row gap-2 font-medium text-lg md:text-2xl items-center text-main-font whitespace-nowrap">
                <button
                    className="flex flex-row justify-center ml-2 gap-3"
                    onClick={handleClick}
                >
                    {
                        pharmacy ? <GiMedicines /> : <AiFillMedicineBox />
                    }
                    <span className="text-main-logo">{name}</span>
                    <span>님</span>
                    <div className="w-7 h-7">
                        {
                            isModalOpen ? <SlArrowUp /> : <SlArrowDown />
                        }
                    </div>
                </button>
            </div>
        </header>
    );
}