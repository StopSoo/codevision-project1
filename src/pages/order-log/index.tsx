import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDateModalStore, useSelectedOrderStore } from "@/store/store";
import Area from "@/components/common/Area";
import { WholesaleOrder, WholesaleOrderItem } from "@/types/wholesaler/predictItem";
import { getWholesaleOrderDetail, getWholesaleOrders } from "@/apis/orderLog";
import { formatDate } from "@/utils/formatDate";
import PaginationComponent from "@/components/common/Pagination";
import OrderLogSkeleton from "@/components/skeleton/OrderLogSkeleton";

export default function OrderLog() {
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [orderLogList, setOrderLogList] = useState<WholesaleOrder[]>([]);
    const [orderDetailList, setOrderDetailList] = useState<WholesaleOrderItem[]>([]);
    const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState(0);
    const contentLimit = 10; // 한 페이지 당 보여줄 주문 내역 건 수

    const { setIsModalOpen, setIsModalClose } = useDateModalStore();
    const { selectedNumber, setSelectedNumber } = useSelectedOrderStore(); // 선택한 주문의 orderId

    const getTotalPrice = () => {
        // 주문 내역의 총합 반환
        const result = orderLogList.reduce((total, item) => total + item.wholesaleTotalPrice, 0);
        return result;
    }

    const handleOrderLogInfo = useCallback(async () => {
        try {
            const data = await getWholesaleOrders(startDate, endDate, page, contentLimit);

            if (data) {
                setTotalPages(data.totalElements);
                const newOrderLogList = data.data.map((d) => {
                    if (d.orderDateTime === null && d.pharmacyName === null) {
                        // 서버 내 목데이터 경우 처리
                        // TODO: 나중에 지울 것
                        return {
                            ...d,
                            pharmacyName: '하이 약국',
                            orderDateTime: '2025-10-30 오후 5:30'
                        };
                    } else {
                        return {
                            ...d,
                            orderDateTime: formatDate(d.orderDateTime)
                        };
                    }
                });
                setOrderLogList(newOrderLogList);
                setSelectedNumber(null);
            }
        } catch (error) {
            alert("도매상 주문 목록 정보 불러오기 실패");
            console.error(error);
        }
    }, [startDate, endDate, page, setSelectedNumber]);

    useEffect(() => {
        handleOrderLogInfo();
    }, [handleOrderLogInfo]);

    useEffect(() => {
        if (startDate > endDate) {
            setIsModalOpen();
            setEndDate(startDate);
            setTimeout(() => setIsModalClose(), 2000);
        }
    }, [startDate, endDate, setIsModalOpen, setIsModalClose]);

    useEffect(() => {
        const handleOrderLogDetail = async (id: number) => {
            setIsLoading(true);
            try {
                const data = await getWholesaleOrderDetail(id);
                if (data && 'items' in data) {
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
            handleOrderLogDetail(selectedNumber);
        }
    }, [selectedNumber]);

    return (
        <Layout>
            <div className="flex flex-col">
                <Area size='default' hasHeader={true} title={"약품 주문 내역"}>
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
                        까지의 약국들의 약품 주문 내역입니다.
                    </div>

                    <div className="bg-gray-200 grid grid-cols-5 gap-4 p-4 text-center font-medium text-main-font rounded-t-lg">
                        <span>주문 번호</span>
                        <span>주문 약국</span>
                        <span>날짜</span>
                        <span>총 수량</span>
                        <span>총 가격</span>
                    </div>

                    <div
                        className="flex-1 bg-gray-50 rounded-b-lg h-[720px] overflow-y-auto overflow-hidden"
                        style={{ scrollbarGutter: "stable" }}
                    >
                        {
                            orderLogList.length === 0
                                ? (
                                    <div className="flex flex-col items-center justify-center h-full py-10">
                                        <Image
                                            src="/assets/cart_plus_icon.png"
                                            width={150}
                                            height={150}
                                            alt="empty cart"
                                            className="mb-6"
                                            priority
                                        />
                                        <div className="text-center text-sub-font space-y-2">
                                            <p>현재 약국들의 주문 내역이 없습니다.</p>
                                        </div>
                                    </div>
                                )
                                : (
                                    <div className="justify-start w-full space-y-2 flex-1">
                                        {
                                            orderLogList.map((order, index) => {
                                                if (
                                                    startDate <= order.orderDateTime.split(' ')[0]
                                                    && order.orderDateTime.split(' ')[0] <= endDate)
                                                    return (
                                                        <div key={index}>
                                                            <button
                                                                name="order log item button"
                                                                className={selectedNumber === order.orderId
                                                                    ? "flex-1 w-full border-2 bg-white border-selected-line"
                                                                    : "flex-1 w-full border-2 border-white hover:bg-selected-bg hover:border-selected-line"
                                                                }
                                                                onClick={() => setSelectedNumber(order.orderId)}
                                                            >
                                                                <div
                                                                    key={index}
                                                                    className="grid grid-cols-5 gap-4 p-4 bg-white text-center"
                                                                >
                                                                    <span>{order.orderNumber}</span>
                                                                    <span>{order.pharmacyName}</span>
                                                                    <span>{order.orderDateTime}</span>
                                                                    <span>{order.wholesaleTotalQuantity}</span>
                                                                    <span>{order.wholesaleTotalPrice.toLocaleString()}원</span>
                                                                </div>
                                                            </button>

                                                            {
                                                                isDetailOpen && selectedNumber === order.orderId
                                                                    ? <div className="flex-1 w-full border-2 border-white animate-slideDown"
                                                                    >
                                                                        <div className="grid grid-cols-6 gap-4 p-4 bg-selected-bg text-center border-b-2 border-selected-line/30">
                                                                            <span className="col-span-2">약품명</span>
                                                                            <span className="col-span-1">단위 가격</span>
                                                                            <span className="col-span-1">수량</span>
                                                                            <span className="col-span-2">결제 총액</span>
                                                                        </div>

                                                                        {
                                                                            isLoading
                                                                                ? <OrderLogSkeleton count={orderDetailList.length} />
                                                                                : (
                                                                                    orderDetailList.map((order, idx) => (
                                                                                        <div
                                                                                            key={idx}
                                                                                            className="grid grid-cols-6 gap-4 p-4 bg-white text-center"
                                                                                        >
                                                                                            <span className="col-span-2">{order.medicineName + ' ' + order.unit}</span>
                                                                                            <span className="col-span-1">{order.unitPrice.toLocaleString()}</span>
                                                                                            <span className="col-span-1">{order.quantity}</span>
                                                                                            <span className="col-span-2">{order.itemTotalPrice.toLocaleString()}원</span>
                                                                                        </div>
                                                                                    ))
                                                                                )
                                                                        }
                                                                    </div>
                                                                    : null
                                                            }
                                                        </div>
                                                    )
                                            })}
                                    </div>
                                )
                        }
                    </div>

                    <PaginationComponent
                        total={totalPages}
                        page={page}
                        limit={contentLimit}
                        setPage={setPage}
                    />

                    <div className="flex justify-between items-center pt-6 mt-6 border-t-2 border-gray-300">
                        <span className="text-2xl font-bold text-main-font">합계</span>
                        <span className="text-2xl font-bold text-main-font">{getTotalPrice().toLocaleString()} 원</span>
                    </div>
                </Area>
            </div>
        </Layout >
    );
}