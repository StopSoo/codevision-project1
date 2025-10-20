import Image from "next/image";
import { useState } from "react";
import { useCartStore, useCartModalStore } from "@/store/store";
import { MedicineVariant, MedicineDetailData } from "@/types/medicine";

interface MedicineDetailProps {
    medicine: MedicineDetailData;
}

export default function MedicineDetail({ medicine }: MedicineDetailProps) {
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    const { setIsModalOpen } = useCartModalStore();
    const { addToCart } = useCartStore();

    const handleQuantityChange = (variantName: string, value: string) => {
        const numValue = parseInt(value) || 0;
        setQuantities(prev => ({
            ...prev,
            [variantName]: numValue
        }));
    };

    const handleAddToCart = (variant: MedicineVariant) => {
        const quantity = quantities[variant.name] || 0;

        const cartItem = {
            id: `${medicine.code}-${variant.name}-${medicine.unit}`,
            name: medicine.name,
            dosage: medicine.dosage,
            unit: medicine.unit,
            price: variant.price,
            quantity: quantity,
            wholesaler: variant.name,
            manufacturer: medicine.manufacturer,
            code: medicine.code,
            available: variant.available,
        };

        if (quantity > 0) {
            addToCart(cartItem); // 장바구니에 담기
            setQuantities(prev => ({ // 선택 수량 초기화
                ...prev,
                [variant.name]: 0
            }));
            setIsModalOpen(); // 모달창 열기        
        }
    };

    return (
        <div className="flex flex-col space-y-6 h-full overflow-y-auto pr-2">
            <h2 className="text-2xl font-medium text-main-font">{medicine.name}</h2>
            <div className="flex flex-row gap-10">

                <div className="w-40 border border-gray-200 rounded-lg flex items-center justify-center bg-white p-5">
                    <Image
                        src="/assets/icon2.png"
                        width={150}
                        height={150}
                        alt={medicine.name}
                        priority
                    />
                </div>

                <div className="flex flex-col justify-center w-[400px] border border-gray-200 rounded-lg p-4 space-y-2">
                    <div className="flex flex-row items-center justify-around font-medium text-lg">
                        <span className="text-main-font w-[40%]">단위</span>
                        <span className="w-[60%]">{medicine.unit}</span>
                    </div>
                    <div className="w-full h-[1px] bg-gray-300 my-5 justify-center" />
                    <div className="flex flex-row items-center justify-around gap-4 text-sm font-medium text-sub-font">
                        <span className="w-[40%]">규격</span>
                        <span className="w-[60%]">{medicine.dosage}</span>
                    </div>
                    <div className="flex flex-row items-center justify-around gap-4 text-sm text-sub-font">
                        <span className="w-[40%]">제조사</span>
                        <span className="w-[60%]">{medicine.manufacturer}</span>
                    </div>
                    <div className="flex flex-row items-center justify-around gap-4 text-sm text-sub-font">
                        <span className="w-[40%]">보험코드</span>
                        <span className="w-[60%]">{medicine.code}</span>
                    </div>
                    <div className="flex flex-row items-center justify-around gap-4 text-sm text-sub-font">
                        <span className="w-[40%]">보험코드</span>
                        <span className="w-[60%]">{medicine.code}</span>
                    </div>
                    <div className="flex flex-row items-center justify-around gap-4 text-sm text-sub-font">
                        <span className="w-[40%]">보험코드</span>
                        <span className="w-[60%]">{medicine.code}</span>
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
                    {medicine.variants.map((variant, index) => (
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
                                        alt={medicine.name}
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
