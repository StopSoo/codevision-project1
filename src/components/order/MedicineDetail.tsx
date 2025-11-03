import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useCartStore, useCartModalStore, useCautionModalStore, useSelectedMedStore } from "@/store/store";
import { MedicineDetailData } from "@/types/pharmacy/medicine";
import { postAddCart } from "@/apis/cart";
import { getMedicineDetail, getWholesaleDetail } from "@/apis/pharmacy";
import { WholesaleItem } from "@/types/pharmacy/order";
import MedicineDetailSkeleton from "../skeleton/MedicineDetailSkeleton";

export default function MedicineDetail() {
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [medicine, setMedicine] = useState<MedicineDetailData>(); // 선택한 약품 정보
    const [wholesales, setWholesales] = useState<WholesaleItem[]>([]); // 선택한 약품의 도매상 정보
    const [isLoading, setIsLoading] = useState<boolean>(false); // 데이터 로딩 여부

    const { setIsModalOpen } = useCartModalStore();
    const { addToCart, isAbleToAdd } = useCartStore();
    const { setIsModalOpen: setIsCautionModalOpen } = useCautionModalStore();
    const { selectedNumber: selectedMedNumber, expectedQty } = useSelectedMedStore();

    const handleQuantityChange = (variantName: string, value: string) => {
        const numValue = parseInt(value) || 0;
        setQuantities(prev => ({
            ...prev,
            [variantName]: numValue
        }));
    };

    useEffect(() => {
        const handleMedDetail = async () => {
            setIsLoading(true);
            try {
                if (selectedMedNumber) {
                    const [medResponse, wholesaleResponse] = await Promise.all([
                        getMedicineDetail(selectedMedNumber),
                        getWholesaleDetail(selectedMedNumber)
                    ]);

                    if (medResponse && wholesaleResponse) {
                        setMedicine(medResponse);
                        setWholesales(wholesaleResponse);
                    } else {
                        console.log(`${selectedMedNumber}번 약품 정보가 없습니다.`);
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        // 약품 정보 불러오기
        if (selectedMedNumber) {
            handleMedDetail();
        }
    }, [selectedMedNumber]);

    const handleAddToCart = async (wholesaleItem: WholesaleItem) => {
        try {
            const quantity = quantities[wholesaleItem.wholesaleName] || 0;

            const cartItem = {
                cartItemId: 0,
                medicineId: medicine!.medicineId,
                medicineName: medicine!.productName,
                standard: medicine!.standard,
                unit: String(medicine!.unitQty),
                unitPrice: wholesaleItem.unitPrice,
                quantity: quantity,
                itemTotalPrice: wholesaleItem.unitPrice * quantity,
                wholesaleName: wholesaleItem.wholesaleName,
                wholesaleId: wholesaleItem.wholesaleId,
            };

            if (quantity > 0) {
                if (isAbleToAdd(cartItem, wholesaleItem.expectedStockQty)) {
                    const result = await postAddCart({
                        medicineId: medicine!.medicineId,
                        wholesaleId: wholesaleItem.wholesaleId,
                        quantity,
                    });

                    if (result) {
                        const updateCartItem = {
                            ...cartItem,
                            cartItemId: result.cartItemId,
                        };
                        setIsModalOpen();
                        addToCart(updateCartItem); // 장바구니에 담기
                        setQuantities(prev => ({ // 선택 수량 초기화
                            ...prev,
                            [wholesaleItem.wholesaleName]: 0
                        }));
                    }
                } else {
                    setIsCautionModalOpen();
                    setQuantities(prev => ({ // 선택 수량 초기화
                        ...prev,
                        [wholesaleItem.wholesaleName]: 0
                    }));
                }
            }
        } catch (error) {
            // 재고 수량 초과 시 안내 모달창 띄우기
            if (error instanceof Error && error.message === 'QUANTITY_EXCEEDED') {
                setIsCautionModalOpen();
            }
        }
    };

    if (isLoading || !medicine) {
        return <MedicineDetailSkeleton />;
    }

    return (
        <div className="flex flex-col space-y-6 h-full overflow-y-auto pr-2">
            <h2 className="text-2xl font-medium text-main-font">{medicine?.productName}</h2>
            <div className="flex flex-row gap-10">

                <div className="w-40 border border-gray-200 rounded-lg flex items-center justify-center bg-white p-5">
                    {/* TODO: API에 이미지 연동되면 수정 */}
                    <Image
                        src="/assets/med_icon.png"
                        width={160}
                        height={160}
                        alt="med default icon"
                        loading="lazy"
                    />
                </div>

                <div className="flex flex-col justify-center w-[400px] border border-gray-200 rounded-lg p-4 space-y-2">
                    <div className="flex flex-row items-center justify-around gap-4 font-medium text-lg">
                        <span className="text-main-font w-[40%]">단위</span>
                        <span className="w-[60%]">{`${medicine?.unitQty}${medicine?.innerUnit}`}</span>
                    </div>
                    <div className="w-full h-[1px] bg-gray-300 my-5 justify-center" />
                    <div className="flex flex-row items-center justify-around gap-4 text-sm font-medium text-sub-font">
                        <span className="w-[40%]">규격</span>
                        <span className="w-[60%]">{medicine?.standard}</span>
                    </div>
                    <div className="flex flex-row items-center justify-around gap-4 text-sm text-sub-font">
                        <span className="w-[40%]">제조사</span>
                        <span className="w-[60%]">{medicine?.productCompany}</span>
                    </div>
                    <div className="flex flex-row items-center justify-around gap-4 text-sm text-sub-font">
                        <span className="w-[40%]">보험코드</span>
                        <span className="w-[60%]">{medicine?.insuranceCode}</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col space-y-4">
                <div className="rounded-xl overflow-hidden">
                    <div className="bg-gray-300 grid grid-cols-9 gap-4 py-3 text-sm font-medium text-main-font text-center border-b-2 border-gray-400">
                        <span className="col-span-2">도매상 명</span>
                        <span className="col-span-2">약품 단가</span>
                        <span className="col-span-2">마일리지</span>
                        <span className="col-span-1">예상 수량</span>
                        <span className="col-span-2">선택 수량</span>
                    </div>

                    {
                        wholesales.map((data, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-9 gap-4 py-3 items-center text-xs md:text-sm text-center"
                            >
                                <span className="text-main-font col-span-2">{data.wholesaleName}</span>
                                <span className="text-main-font col-span-2">{data.unitPrice.toLocaleString()}</span>
                                <div className="p-2 mx-4 bg-mileage-bg rounded-xl col-span-2">
                                    <span className="text-mileage-font font-medium">
                                        {
                                            data.point > 0
                                                ? "+"
                                                : data.point == 0
                                                    ? ""
                                                    : "-"
                                        }
                                        {data.point} %
                                    </span>
                                </div>
                                <span className="text-main-font col-span-1">{data.expectedStockQty ?? 0}</span>
                                <div className="flex flex-row w-full items-center justify-center gap-2 col-span-2">
                                    <input
                                        type="number"
                                        min="0"
                                        max={data.expectedStockQty}
                                        placeholder={String(expectedQty)}
                                        value={quantities[data.wholesaleName] || ""}
                                        onChange={(e) => handleQuantityChange(data.wholesaleName, e.target.value)}
                                        className="w-[60%] px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-selected-line focus:bg-selected-bg text-center"
                                    />
                                    <button
                                        name="cart button"
                                        area-label="cart button"
                                        onClick={() => handleAddToCart(data)}
                                        className="w-[40%] px-4 py-2 bg-white text-white rounded-xl border-2 border-cart hover:bg-hover-green transition-colors"
                                    >
                                        <Image
                                            src="/assets/cart_icon.png"
                                            width={25}
                                            height={25}
                                            alt={data.wholesaleName}
                                            priority
                                        />
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
