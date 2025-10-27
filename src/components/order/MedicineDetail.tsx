import Image from "next/image";
import { useEffect, useState } from "react";
// import { useCartStore, useCartModalStore, useCautionModalStore, useSelectedMedStore } from "@/store/store";
// import { MedicineVariant, MedicineDetailData } from "@/types/pharmacy/medicine";
import { useSelectedMedStore } from "@/store/store";
import { MedicineDetailData } from "@/types/pharmacy/medicine";
// import { postAddCart } from "@/apis/cart";
import { getMedicineDetail } from "@/apis/pharmacy";

export default function MedicineDetail() {
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const [medicine, setMedicine] = useState<MedicineDetailData>(); // 선택한 약품 정보

    // const { setIsModalOpen } = useCartModalStore();
    // const { addToCart, isAbleToAdd } = useCartStore();
    // const { setIsModalOpen: setIsCautionModalOpen } = useCautionModalStore();
    const { selectedNumber: selectedMedNumber } = useSelectedMedStore();

    const handleQuantityChange = (variantName: string, value: string) => {
        const numValue = parseInt(value) || 0;
        setQuantities(prev => ({
            ...prev,
            [variantName]: numValue
        }));
    };

    const handleMedDetail = async () => {
        try {
            if (selectedMedNumber) {
                const response = await getMedicineDetail(selectedMedNumber);

                if (response) {
                    setMedicine(response);
                } else {
                    console.log(`${selectedMedNumber}번 약품 정보가 없습니다.`);
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // 약품 정보 불러오기
        if (selectedMedNumber) {
            handleMedDetail();
        }
    }, [selectedMedNumber]);

    // const handleAddToCart = async (variant: MedicineVariant) => {
    //     try {
    //         const quantity = quantities[variant.name] || 0;
    //         // TODO: API 연결 시 수정 필요
    //         const result = await postAddCart({
    //             medicineId: medicine!.medicineId,
    //             wholesaleId,
    //             quantity,
    //         });

    //         if (result) {
    //             const cartItem = {
    //                 medicineId: medicine!.medicineId,
    //                 name: medicine!.productName,
    //                 dosage: medicine!.standard,
    //                 unit: String(medicine!.unitQty),
    //                 price: variant.price,
    //                 quantity: quantity,
    //                 wholesaler: variant.name,
    //                 manufacturer: medicine!.productCompany,
    //                 code: medicine!.insuranceCode,
    //                 available: variant.available,
    //             };

    //             if (quantity > 0) {
    //                 // 모달창 열기 
    //                 if (isAbleToAdd(cartItem)) {
    //                     setIsModalOpen();
    //                     addToCart(cartItem); // 장바구니에 담기
    //                     setQuantities(prev => ({ // 선택 수량 초기화
    //                         ...prev,
    //                         [variant.name]: 0
    //                     }));
    //                 } else {
    //                     setIsCautionModalOpen();
    //                     setQuantities(prev => ({ // 선택 수량 초기화
    //                         ...prev,
    //                         [variant.name]: 0
    //                     }));
    //                 }
    //             }
    //         }
    //     } catch (error) {
    //         alert("장바구니에 담기 실패");
    //     }
    // };

    return (
        <div className="flex flex-col space-y-6 h-full overflow-y-auto pr-2">
            <h2 className="text-2xl font-medium text-main-font">{medicine?.productName}</h2>
            <div className="flex flex-row gap-10">

                <div className="w-40 border border-gray-200 rounded-lg flex items-center justify-center bg-white p-5">
                    {/* TODO: API에 이미지 연동되면 수정 */}
                    <Image
                        src="/assets/med_icon.png"
                        width={150}
                        height={150}
                        alt="med default icon"
                        priority
                    />
                </div>

                <div className="flex flex-col justify-center w-[400px] border border-gray-200 rounded-lg p-4 space-y-2">
                    <div className="flex flex-row items-center justify-around font-medium text-lg">
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
                    <div className="bg-gray-300 grid grid-cols-5 gap-4 p-3 text-sm font-medium text-main-font text-center border-b-2 border-gray-400">
                        <span>도매상 명</span>
                        <span>약품 단가</span>
                        <span>마일리지</span>
                        <span>재고 수량</span>
                        <span>선택 수량</span>
                    </div>
                    {/* TODO: 도매상 정보가 API에 업데이트되면 수정 */}
                    {/* {medicine?.variants.map((variant, index) => (
                        <div
                            key={index}
                            className="grid grid-cols-5 gap-4 py-3 items-center text-xs md:text-sm text-center"
                        >
                            <span className="text-main-font">{variant.name}</span>
                            <span className="text-main-font">{variant.price.toLocaleString()}</span>
                            <div className="p-2 mx-4 bg-mileage-bg rounded-xl">
                                <span className="text-mileage-font font-medium">{variant.margin}</span>
                            </div>
                            <span className="text-main-font">{variant.available}</span>
                            <div className="flex flex-row items-center justify-center gap-2">
                                <input
                                    type="number"
                                    min="0"
                                    max={variant.available}
                                    placeholder="0"
                                    value={quantities[variant.name] || ""}
                                    onChange={(e) => handleQuantityChange(variant.name, e.target.value)}
                                    className="w-15 md:w-20 px-3 py-2 border-2 border-gray-300 rounded focus:outline-none focus:border-selected-line focus:bg-selected-bg text-center"
                                />
                                <button
                                    onClick={() => handleAddToCart(variant)}
                                    className="px-4 py-2 bg-white text-white rounded-xl border-2 border-cart hover:bg-hover-green transition-colors"
                                >
                                    <Image
                                        src="/assets/cart_icon.png"
                                        width={25}
                                        height={25}
                                        alt={variant.name}
                                    />
                                </button>
                            </div>
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    );
}
