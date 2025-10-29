import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDateModalStore, useSelectedOrderStore } from "@/store/store";
import Area from "@/components/common/Area";
import { getPharmacyOrderHistory, getPharmacyOrderHistoryDetail } from "@/apis/order";
import { OrderedItem } from "@/types/pharmacy/orderedList";
import { CartDetailItem } from "@/types/cart/cart";
import { formatDate } from "@/utils/formatDate";
import OrderHistorySkeleton from "@/components/skeleton/OrderHistorySkeleton";

export default function OrderHistory() {
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [orderHistoryList, setOrderHistoryList] = useState<OrderedItem[]>([]); // 주문 내역
    const [orderDetailList, setOrderDetailList] = useState<CartDetailItem[]>([]); // 주문 내역
    const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);

    const { setIsModalOpen, setIsModalClose } = useDateModalStore();
    const { selectedNumber, setSelectedNumber } = useSelectedOrderStore(); // 선택한 주문의 orderId

    const getTotalPrice = () => {
        // 주문 내역의 총합 반환
        const result = orderHistoryList.reduce((total, item) => total + item.orderTotalPrice, 0);
        return result;
    }

    const handleOrderInfo = useCallback(async () => {
        try {
            const data = await getPharmacyOrderHistory(startDate, endDate, 1, 10, keyword);

            if (data) {
                const newOrderHistoryList = data.map((d) => ({
                    ...d,
                    orderDateTime: formatDate(d.orderDateTime)
                }));
                setOrderHistoryList(newOrderHistoryList);
                setSelectedNumber(null);
            }
        } catch (error) {
            alert("주문 목록 정보 불러오기 실패");
            console.error(error);
        }
    }, [startDate, endDate, keyword, setSelectedNumber]);

    useEffect(() => {
        if (startDate > endDate) {
            setIsModalOpen();
            setEndDate(startDate);
            setTimeout(() => setIsModalClose(), 2000);
        }
    }, [startDate, endDate, setIsModalOpen, setIsModalClose]);

    useEffect(() => {
        handleOrderInfo();
    }, [handleOrderInfo]);

    useEffect(() => {
        const handleOrderDetail = async (id: number) => {
            setIsLoading(true);
            try {
                const data = await getPharmacyOrderHistoryDetail(id);

                if (data) {
                    setIsDetailOpen(true);
                    setOrderDetailList(data.items);
                }
            } catch (error) {
                alert("주문 상세 정보 불러오기 실패");
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }

        if (selectedNumber !== null) {
            handleOrderDetail(selectedNumber);
        }
    }, [selectedNumber]);

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
                                    className="px-4 py-2 border-2 border-gray-300 text-main-font text-base rounded focus:outline-none focus:border-main-color focus:bg-selected-bg"
                                />
                                <span className="text-xl text-gray-500">-</span>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className="px-4 py-2 border-2 border-gray-300 text-main-font text-base rounded focus:outline-none focus:border-main-color focus:bg-selected-bg"
                                />
                            </div>

                            <div
                                className="flex flex-row items-center gap-5"
                            >
                                <input
                                    value={keyword}
                                    placeholder="도매상명 or 약품명 입력"
                                    onChange={(e) => setKeyword(e.target.value)}
                                    className="px-5 py-2 w-[250px] h-11 border-2 border-gray-300 text-main-font text-sm rounded focus:outline-none focus:border-main-color focus:bg-selected-bg"
                                />
                                <button
                                    className="text-base text-main-font px-4 py-2 border-2 hover:border-selected-line"
                                    onClick={handleOrderInfo}
                                >
                                    검색
                                </button>
                            </div>
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
                                orderHistoryList.length === 0
                                    ? (
                                        <div
                                            key="hi"
                                            className="flex flex-col items-center justify-center h-full py-10"
                                        >
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
                                                orderHistoryList.map((order, index) => {
                                                    if (
                                                        startDate <= order.orderDateTime.split(' ')[0] &&
                                                        order.orderDateTime.split(' ')[0] <= endDate
                                                    )
                                                        return (
                                                            <div key={index}>
                                                                <button
                                                                    className={selectedNumber === order.orderId
                                                                        ? "flex-1 w-full border-2 bg-white border-selected-line"
                                                                        : "flex-1 w-full border-2 border-white hover:bg-selected-bg hover:border-selected-line"
                                                                    }
                                                                    onClick={() => setSelectedNumber(order.orderId)}
                                                                >
                                                                    <div className="grid grid-cols-3 gap-4 p-4 bg-white text-center">
                                                                        <span>{order.orderDateTime}</span>
                                                                        <span>{order.orderNumber}</span>
                                                                        <span>{order.orderTotalPrice.toLocaleString()}원</span>
                                                                    </div>
                                                                </button>

                                                                {
                                                                    isDetailOpen && selectedNumber === order.orderId
                                                                        ? <div className="flex-1 w-full border-2 border-white"
                                                                        >
                                                                            <div className="grid grid-cols-6 gap-4 p-4 bg-selected-bg text-center border-b-2 border-selected-line/30">
                                                                                <span>약품명</span>
                                                                                <span>약품 상세 이름</span>
                                                                                <span>단위 가격</span>
                                                                                <span>수량</span>
                                                                                <span>도매상명</span>
                                                                                <span>결제 총액</span>
                                                                            </div>

                                                                            {
                                                                                isLoading
                                                                                    ? <OrderHistorySkeleton count={orderDetailList.length} />
                                                                                    : (
                                                                                        orderDetailList.map((order, idx) => (
                                                                                            <div
                                                                                                key={idx}
                                                                                                className="grid grid-cols-6 gap-4 p-4 bg-white text-center"
                                                                                            >
                                                                                                <span>{order.medicineName}</span>
                                                                                                <span>{order.detailName}</span>
                                                                                                <span>{order.unitPrice.toLocaleString()}</span>
                                                                                                <span>{order.quantity}</span>
                                                                                                <span>{order.wholesaleName}</span>
                                                                                                <span>{order.itemTotalPrice.toLocaleString()}원</span>
                                                                                            </div>
                                                                                        ))
                                                                                    )
                                                                            }
                                                                        </div>
                                                                        : null
                                                                }

                                                                {
                                                                    orderHistoryList[index + 1]
                                                                        && order.orderDateTime.split(' ')[0] !== orderHistoryList[index + 1].orderDateTime.split(' ')[0]
                                                                        ? <div
                                                                            className="w-full h-2 my-2 bg-selected-line"
                                                                        />
                                                                        : null
                                                                }
                                                            </div>
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