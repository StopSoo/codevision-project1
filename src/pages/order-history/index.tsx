import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDateModalStore, useOrderedListStore, useSelectedOrderStore } from "@/store/store";
import Area from "@/components/common/Area";
import { AuthAPI } from "@/apis/axiosInstance";
import { CartDetailItem } from "@/types/cart/cart";

export default function OrderHistory() {
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [selectedWholesaler, setSelectedWholesaler] = useState("전체");
    const [orderHistoryList, setOrderHistoryList] = useState<CartDetailItem[]>([]);
    const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);

    const { orderedList, getTotalPrice } = useOrderedListStore();
    const { setIsModalOpen, setIsModalClose } = useDateModalStore();
    const { selectedNumber, setSelectedNumber } = useSelectedOrderStore(); // 선택한 주문의 orderId

    const handleClickOrder = async () => {
        try {
            const data = await AuthAPI.viewPharmacyOrderHistory(
                startDate, endDate
            );

            if (data && data.result.orderId !== null) {
                setSelectedNumber(data.result.orderId);
            }
        } catch (error) {
            alert("orderId 불러오기 실패");
            console.log(error);
        }
    };

    const handleOrderDetail = async () => {
        try {
            if (selectedNumber !== null) {
                const data = await AuthAPI.viewPharmacyOrderDetail(selectedNumber);

                if (data) {
                    setOrderHistoryList(data.result.items);
                    setIsDetailOpen(true);
                }
            }
        } catch (error) {
            alert("주문 상세 정보 불러오기 실패");
            console.log(error);
        }
    }

    useEffect(() => {
        if (startDate > endDate) {
            setIsModalOpen();
            setEndDate(startDate);
            setTimeout(() => setIsModalClose(), 2000);
        }
    }, [startDate, endDate, setIsModalOpen, setIsModalClose]);

    return (
        <Layout>
            <div className="flex flex-row">
                <Area size='default' hasHeader={true} title={"주문 내역"}>
                    <div>
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

                            <select
                                value={selectedWholesaler}
                                onChange={(e) => setSelectedWholesaler(e.target.value)}
                                className="px-10 py-2 h-11 border-2 border-gray-300 rounded focus:outline-none focus:border-main-color focus:bg-selected-bg"
                            >
                                <option value="전체">전체</option>
                                <option value="도매상 A">도매상 A</option>
                                <option value="도매상 B">도매상 B</option>
                                <option value="도매상 C">도매상 C</option>
                            </select>
                        </div>

                        <div className="text-xl font-medium text-main-font mb-6">
                            <span className="text-main-color">{startDate} </span>
                            부터
                            <span className="text-main-color"> {endDate} </span>
                            까지의 주문 내역입니다.
                        </div>

                        <div className="bg-gray-200 grid grid-cols-3 gap-4 p-4 text-center font-medium text-main-font rounded-t-lg">
                            <span>날짜</span>
                            <span>주문 번호</span>
                            <span>주문 금액</span>
                        </div>

                        <div className="flex-1 bg-gray-50 rounded-b-lg h-screen">
                            {
                                orderedList.length === 0
                                    ? (
                                        <div className="flex flex-col items-center justify-center h-full py-10">
                                            <Image
                                                src="/assets/cart_plus_icon.png"
                                                width={150}
                                                height={150}
                                                alt="empty cart"
                                                className="mb-6"
                                            />
                                            <div className="text-center text-sub-font space-y-2">
                                                <p>현재 주문 내역이 없습니다.</p>
                                                <p>AI가 분석한 주문 리스트를 통해</p>
                                                <p>약품 주문을 시작해보세요!</p>
                                            </div>
                                        </div>
                                    )
                                    : (
                                        <div className="justify-start w-full space-y-2">
                                            {
                                                orderedList.map((order, index) => {
                                                    if (
                                                        startDate <= order.date &&
                                                        order.date <= endDate
                                                        && (selectedWholesaler === "전체" || selectedWholesaler === order.wholesaler)
                                                    )
                                                        return (
                                                            <>
                                                                {/* TODO: 클릭된 애 border 변경된 색깔 고정 */}
                                                                <button
                                                                    className="flex-1 w-full border-2 border-white hover:bg-selected-bg hover:border-selected-line"
                                                                    onClick={handleClickOrder}
                                                                >
                                                                    <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-white text-center">
                                                                        <span>{order.date}</span>
                                                                        <span>{order.orderNumber}</span>
                                                                        <span>{order.totalPrice.toLocaleString()}원</span>
                                                                    </div>
                                                                </button>
                                                                {
                                                                    // TODO: 상세정보 창 하나만 열릴 수 있게 적용해야 함
                                                                    isDetailOpen
                                                                        ? <div className="flex-1 w-full border-2 border-white hover:bg-selected-bg hover:border-selected-line"
                                                                        >
                                                                            {
                                                                                orderHistoryList.map((order) => (
                                                                                    <div key={index} className="grid grid-cols-6 gap-4 p-4 bg-white text-center">
                                                                                        <span>{order.medicineName}</span>
                                                                                        <span>{order.detailName}</span>
                                                                                        <span>{order.unitPrice}</span>
                                                                                        <span>{order.quantity}</span>
                                                                                        <span>{order.wholesaleName}</span>
                                                                                        <span>{order.itemTotalPrice.toLocaleString()}원</span>
                                                                                    </div>
                                                                                ))
                                                                            }
                                                                        </div>
                                                                        : null
                                                                }
                                                            </>
                                                        )
                                                })
                                            }
                                        </div>
                                    )
                            }
                        </div>

                        <div className="flex justify-between items-center pt-6 mt-6 border-t-2 border-gray-300">
                            <span className="text-2xl font-bold text-main-font">합계</span>
                            <span className="text-2xl font-bold text-main-font">{getTotalPrice().toLocaleString()} 원</span>
                        </div>
                    </div>
                </Area>
            </div>
        </Layout >
    );
}