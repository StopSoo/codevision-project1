import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDateModalStore, useOrderItemStore } from "@/store/store";

export default function OrderLog() {
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

    const { orderedList, getTotalPrice } = useOrderItemStore();
    const { setIsModalOpen, setIsModalClose } = useDateModalStore();

    useEffect(() => {
        if (startDate > endDate) {
            setIsModalOpen();
            setEndDate(startDate);
            setTimeout(() => setIsModalClose(), 2000);
        }
    }, [startDate, endDate, setIsModalOpen, setIsModalClose]);

    return (
        <Layout>
            <div className="flex flex-col h-screen">
                <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col h-full">
                    <h1 className="text-3xl font-bold text-main-font mb-6">주문 내역</h1>
                    <div className="w-full h-[2px] bg-gray-300 mb-6" />

                    <div className="flex flex-row items-center justify-between gap-4 mb-6">
                        <div className="flex items-center justify-center gap-3 h-11">
                            <Image
                                src="/assets/check_list_icon.png"
                                width={45}
                                height={45}
                                alt="check list icon"
                            />
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-main-color focus:bg-selected-bg"
                            />
                            <span className="text-gray-500">-</span>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="px-4 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-main-color focus:bg-selected-bg"
                            />
                        </div>
                    </div>

                    <div className="text-xl font-medium text-main-font mb-6">
                        <span className="text-main-color">{startDate} </span>
                        부터
                        <span className="text-main-color"> {endDate} </span>
                        까지의 주문 내역입니다.
                    </div>

                    <div className="bg-gray-200 grid grid-cols-5 gap-4 p-4 text-center font-medium text-main-font rounded-t-lg">
                        <span>날짜</span>
                        <span>품목 명</span>
                        <span>약품 단가</span>
                        <span>수량</span>
                        <span>가격</span>
                    </div>

                    {orderedList.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 rounded-b-lg py-4">
                            <div className="flex flex-col items-center">
                                <Image
                                    src="/assets/cart_plus_icon.png"
                                    width={150}
                                    height={150}
                                    alt="empty cart"
                                    className="mb-6"
                                />
                                <div className="text-center text-sub-font space-y-2">
                                    <p>현재 주문 내역이 없습니다.</p>
                                    <p>AI가 분석한 주문 예상 품목을 통해</p>
                                    <p>약국에서 필요한 약품 주문을 시작해보세요!</p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-start overflow-y-auto bg-gray-50 rounded-b-lg py-4">
                            <div className="justify-start w-full space-y-2">
                                {orderedList.map((order, index) => {
                                    if (startDate <= order.date && order.date <= endDate)
                                        return (
                                            <div key={index} className="grid grid-cols-5 gap-4 p-4 bg-white text-center">
                                                <span>{order.date}</span>
                                                <span>{order.name}</span>
                                                <span>{order.unitPrice.toLocaleString()}</span>
                                                <span>{order.quantity}</span>
                                                <span>{order.price.toLocaleString()}원</span>
                                            </div>
                                        )
                                })}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between items-center pt-6 mt-6 border-t-2 border-gray-300">
                        <span className="text-2xl font-bold text-main-font">합계</span>
                        <span className="text-2xl font-bold text-main-font">{getTotalPrice().toLocaleString()} 원</span>
                    </div>
                </div>
            </div>
        </Layout >
    );
}