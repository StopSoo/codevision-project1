import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { MemberProps } from '@/types/member/member';
import { getMyPage } from '@/apis/member';
import Image from 'next/image';

export default function MyPage() {
    const router = useRouter();

    const [memberType, setMemberType] = useState<MemberProps['member']>('PHARMACY');
    const [workplace, setWorkplace] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('010');
    const [zipCode, setZipCode] = useState<string>('');
    const [roadAddress, setRoadAddress] = useState<string>('');
    const [detailAddress, setDetailAddress] = useState<string>('');

    const handleEditMyInfo = () => {
        router.push('/mypage/edit');
    };
    // 사용자 정보 불러오기
    const handleMyInfo = async () => {
        try {
            const result = await getMyPage();

            if (result) {
                const { username, email, phoneNumber, role, workplace, address } = result;
                const new_role = role.split('_')[1]
                if (new_role === 'PHARMACY' || new_role === 'WHOLESALE') {
                    setMemberType(new_role);
                }
                setName(username);
                setEmail(email);
                setPhoneNumber(phoneNumber);
                setWorkplace(workplace);
                setZipCode(address.zipCode);
                setRoadAddress(address.roadAddress);
                setDetailAddress(address.detailAddress);
            }
        } catch (error) {
            alert("서버 오류 or 회원 정보 불러오기 실패");
            console.log(error);
        }
    };

    useEffect(() => {
        handleMyInfo();
    }, [name, phoneNumber, zipCode, roadAddress, detailAddress]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-main-bg py-12">
            <div className="w-full max-w-3xl px-8">
                <div className="flex justify-center mb-6">
                    <Image
                        src="/assets/pharmacy-logo.png"
                        alt="Medict Logo"
                        width={150}
                        height={150}
                        priority
                        fetchPriority="high"
                    />
                </div>

                <h1
                    className="text-4xl font-bold text-center text-main-logo mb-8"
                    style={{ fontStyle: 'italic' }}
                >
                    Medict
                </h1>

                <h2 className="text-2xl md:text-3xl font-bold text-center text-main-font mb-8">
                    회원 정보
                </h2>

                <div className="mb-8">
                    <h3 className="text-lg font-medium text-main-font border-b-2 border-gray-800 pb-2">
                        회원
                    </h3>

                    <div className="bg-gray-100 p-6 flex flex-row items-center gap-4 border-b-2 border-gray-200">
                        <label className="w-32 text-main-font font-medium">
                            회원 구분
                        </label>
                        <div className="flex flex-row gap-10">
                            <label className="flex flex-row items-center justify-center gap-3">
                                <span className="text-unselected-font font-medium">{memberType === 'PHARMACY' ? "약국" : "도매상"}</span>
                            </label>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-6 flex flex-row items-center gap-4 border-b-2 border-gray-200">
                        <label className="w-32 text-main-font font-medium space-x-1">
                            <span>{memberType === 'PHARMACY' ? "약국" : "도매상"}명</span>
                        </label>
                        <label className="flex flex-row items-start justify-center gap-3">
                            <span className="text-unselected-font font-medium">{workplace}</span>
                        </label>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-medium text-main-font border-b-2 border-gray-800 pb-2">
                        기본 정보
                    </h3>

                    <div>
                        <div className="bg-gray-100 items-center p-6 flex flex-row items-start gap-4 border-b-2 border-gray-200">
                            <label className="w-32 text-main-font font-medium">
                                이메일
                            </label>
                            <label className="flex flex-row items-start justify-center gap-3">
                                <span className="text-unselected-font font-medium">{email}</span>
                            </label>
                        </div>

                        <div className="bg-gray-100 p-6 flex items-center gap-4 border-b-2 border-gray-200">
                            <label className="w-32 text-main-font font-medium">
                                이름
                            </label>
                            <label className="flex flex-row items-center justify-center gap-3">
                                <span className="text-unselected-font font-medium">{name}</span>
                            </label>
                        </div>

                        <div className="bg-gray-100 p-6 flex items-start gap-4 border-b-2 border-gray-200">
                            <label className="w-32 text-main-font font-medium">
                                휴대전화
                            </label>
                            <div className="flex-1 flex items-center gap-2">
                                <label className="flex flex-row items-center justify-center gap-3">
                                    <span className="text-unselected-font font-medium">{phoneNumber}</span>
                                </label>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-6 flex items-center gap-4 border-b-2 border-gray-200">
                            <label className="w-32 text-main-font font-medium">
                                주소
                            </label>
                            <div className="flex-1 flex-col space-y-3">
                                <span className="text-unselected-font font-medium">{zipCode}</span>
                                <label className="flex flex-row items-center justify-start gap-3">
                                    <span className="text-unselected-font font-medium">{roadAddress}</span>
                                    <span className="text-unselected-font font-medium">{detailAddress}</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-5 mt-12 mb-8">
                    <button
                        name="go home button"
                        onClick={() => router.back()}
                        className="flex-1 py-4 bg-white border-2 border-gray-300 text-gray-800 font-medium text-lg hover:bg-gray-50 transition-colors"
                    >
                        홈으로 가기
                    </button>
                    <button
                        name="edit button"
                        onClick={handleEditMyInfo}
                        className="flex-1 py-4 text-white bg-main-logo border-none text-gray-800 font-medium text-lg hover:bg-hover-blue transition-colors"
                    >
                        회원 정보 수정
                    </button>
                </div>
            </div>
        </div>
    );
}