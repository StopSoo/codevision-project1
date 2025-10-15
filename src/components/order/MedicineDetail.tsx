import Image from "next/image";
import { useState } from "react";

type MedicineVariant = {
    name: string;
    price: number;
    margin: string;
    available: number;
};

type MedicineDetailData = {
    name: string;
    unit: string;
    dosage: string;
    manufacturer: string;
    code: string;
    variants: MedicineVariant[];
};

interface MedicineDetailProps {
    medicine: MedicineDetailData;
}

export default function MedicineDetail({ medicine }: MedicineDetailProps) {
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

    const handleQuantityChange = (variantName: string, value: string) => {
        const numValue = parseInt(value) || 0;
        setQuantities(prev => ({
            ...prev,
            [variantName]: numValue
        }));
    };

    const handleAddToCart = (variantName: string) => {
        const quantity = quantities[variantName] || 0;
        console.log(`Adding to cart: ${medicine.name} - ${variantName}, Quantity: ${quantity}`);
        // TODO: Implement add to cart logic
    };

    return (
        <div className="flex flex-col space-y-6 h-full overflow-y-auto pr-2">
            <h2 className="text-2xl font-medium text-main-font">{medicine.name}</h2>
            <div className="flex flex-row gap-4 h-40">
                {/* 약품 이미지 */}
                <div className="w-40 border border-gray-200 rounded-lg flex items-center justify-center bg-white p-5">
                    <Image
                        src="/assets/icon2.png"
                        width={150}
                        height={150}
                        alt={medicine.name}
                    />
                </div>
                {/* 약품 정보 */}
                <div className="w-[400px] border border-gray-200 rounded-lg p-4 space-y-2">
                    <div className="flex flex-row items-center gap-5 font-medium text-lg">
                        <span className="text-main-font">단위</span>
                        <span>{medicine.unit}</span>
                    </div>
                    <div className="w-full h-[1px] bg-gray-300 my-3" />
                    <div className="flex flex-row items-center justify-around gap-4 text-sm font-medium text-sub-font">
                        <span>규격</span>
                        <span>{medicine.dosage}</span>
                    </div>
                    <div className="flex flex-row items-center justify-around gap-4 text-sm text-sub-font">
                        <span>제조사</span>
                        <span>{medicine.manufacturer}</span>
                    </div>
                    <div className="flex flex-row items-center justify-around gap-4 text-sm text-sub-font">
                        <span>보험코드</span>
                        <span>{medicine.code}</span>
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
                        <div className="grid grid-cols-5 gap-4 p-3 items-center text-sm text-center">
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
                                    value={quantities[variant.name] || 0}
                                    onChange={(e) => handleQuantityChange(variant.name, e.target.value)}
                                    className="w-20 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-main-color text-center"
                                />
                                <button
                                    onClick={() => handleAddToCart(variant.name)}
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
