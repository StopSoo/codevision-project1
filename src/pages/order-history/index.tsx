import Layout from "@/components/layout/Layout";
import Image from "next/image";
import { useCallback, useEffect, useState, KeyboardEvent } from "react";
import { useDateModalStore, useSelectedOrderStore } from "@/store/store";
import Area from "@/components/common/Area";
import { getPharmacyOrderHistory, getPharmacyOrderHistoryDetail } from "@/apis/order";
import { OrderedItem } from "@/types/pharmacy/orderedList";
import { CartDetailItem } from "@/types/cart/cart";
import { formatDate } from "@/utils/formatDate";
import OrderHistorySkeleton from "@/components/skeleton/OrderHistorySkeleton";
import PaginationComponent from "@/components/common/Pagination";

export default function OrderHistory() {
    const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
    const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
    const [orderHistoryList, setOrderHistoryList] = useState<OrderedItem[]>([]); // 주문 목록
    const [orderDetailList, setOrderDetailList] = useState<CartDetailItem[]>([]); // 주문 상세 목록
    const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
    const [keyword, setKeyword] = useState<string>('');
    const [paramKeyword, setParamKeyword] = useState<string>('');
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1); // 현재 페이지
    const [totalPages, setTotalPages] = useState(0);
    const contentLimit = 10; // 한 페이지 당 보여줄 주문 내역 건 수

    const { setIsModalOpen, setIsModalClose } = useDateModalStore();
    const { selectedNumber, setSelectedNumber } = useSelectedOrderStore(); // 선택한 주문의 orderId

    const enterkey = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            setParamKeyword(keyword);
            handleOrderInfo();
        }
    };

    const getTotalPrice = () => {
        // 주문 내역의 총합 반환
        const result = orderHistoryList.reduce((total, item) => total + item.orderTotalPrice, 0);
        return result;
    }

    const handleOrderInfo = useCallback(async () => {
        try {
            const data = await getPharmacyOrderHistory(startDate, endDate, page, contentLimit, paramKeyword);

            if (data) {
                setTotalPages(data.totalElements);
                const newOrderHistoryList = data.data.map((d) => ({
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
    }, [startDate, endDate, page, paramKeyword, setSelectedNumber]);

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
                                    onKeyUp={(e) => enterkey(e)}
                                    className="px-5 py-2 w-[250px] h-11 border-2 border-gray-300 text-main-font text-sm rounded focus:outline-none focus:border-main-color focus:bg-selected-bg"
                                />
                                <button
                                    className="text-base text-main-font px-4 py-2 border-2 hover:border-selected-line"
                                    onClick={() => {
                                        setParamKeyword(keyword);
                                        handleOrderInfo();
                                    }}
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

                        <div
                            className="flex-1 bg-gray-50 rounded-b-lg h-[720px] overflow-y-auto overflow-hidden"
                            style={{ scrollbarGutter: "stable" }}
                        >
                            {
                                orderHistoryList.length === 0
                                    ? keyword === ''
                                        ? (
                                            <div
                                                className="flex flex-col items-center justify-center h-full py-10"
                                            >
                                                <Image
                                                    src="/assets/cart_plus_icon.png"
                                                    width={150}
                                                    height={150}
                                                    alt="empty cart"
                                                    className="mb-6"
                                                    priority
                                                />
                                                <div className="text-center text-sub-font space-y-2">
                                                    <p>현재 주문 내역이 없습니다.</p>
                                                    <p>AI가 분석한 주문 리스트를 통해</p>
                                                    <p>약품 주문을 시작해보세요!</p>
                                                </div>
                                            </div>
                                        )
                                        : (
                                            <div
                                                className="flex flex-col items-center justify-center h-full py-10"
                                            >
                                                <Image
                                                    src="/assets/search_icon.png"
                                                    width={150}
                                                    height={150}
                                                    alt="no search keyword"
                                                    className="mb-6"
                                                    priority
                                                />
                                                <div className="text-center text-sub-font space-y-2">
                                                    <p>검색어와 일치하는 주문 내역이 없습니다.</p>
                                                    <p>검색어를 확인해주세요!</p>
                                                </div>
                                            </div>
                                        )
                                    : (
                                        <div className="justify-start w-full space-y-2 flex-1">
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
                                                                        ? <div className="flex-1 w-full border-2 border-white animate-slideDown"
                                                                        >
                                                                            <div className="grid grid-cols-9 gap-4 p-4 bg-selected-bg text-center border-b-2 border-selected-line/30">
                                                                                <span className="col-span-2">약품명</span>
                                                                                <span className="col-span-2">약품 상세 이름</span>
                                                                                <span className="col-span-1">단위 가격</span>
                                                                                <span className="col-span-1">수량</span>
                                                                                <span className="col-span-1">도매상명</span>
                                                                                <span className="col-span-2">결제 총액</span>
                                                                            </div>

                                                                            {
                                                                                isLoading
                                                                                    ? <OrderHistorySkeleton count={orderDetailList.length} />
                                                                                    : (
                                                                                        orderDetailList.map((order, idx) => (
                                                                                            <div
                                                                                                key={idx}
                                                                                                className={
                                                                                                    keyword !== '' && order.medicineName.includes(keyword)
                                                                                                        ? "grid grid-cols-9 gap-4 p-4 bg-sub-color/40 text-center"
                                                                                                        : "grid grid-cols-9 gap-4 p-4 bg-white text-center"
                                                                                                }
                                                                                            >
                                                                                                <span className="col-span-2">{order.medicineName}</span>
                                                                                                <span className="col-span-2">{order.standard}</span>
                                                                                                <span className="col-span-1">{order.unitPrice.toLocaleString()}</span>
                                                                                                <span className="col-span-1">{order.quantity}</span>
                                                                                                <span className="col-span-1">{order.wholesaleName}</span>
                                                                                                <span className="col-span-2">{order.itemTotalPrice.toLocaleString()}원</span>
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

                        <PaginationComponent
                            total={totalPages}
                            page={page}
                            limit={contentLimit}
                            setPage={setPage}
                        />

                        <div className="flex justify-between items-center pt-6 mt-3 border-t-2 border-gray-300">
                            <span className="text-2xl font-bold text-main-font">합계</span>
                            <span className="text-2xl font-bold text-main-font">{getTotalPrice().toLocaleString()} 원</span>
                        </div>
                    </div>
                </Area>
            </div >
        </Layout >
    );
}