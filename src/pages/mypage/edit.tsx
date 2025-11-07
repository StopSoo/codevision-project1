import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { useAddressModalStore, useMemberStore, useEditMyInfoModalStore, useWrongPwModalStore } from '@/store/store';
import NotiModal from '@/components/modal/NotiModal';
import { isValidPassword } from '@/utils/utility';
import { MemberProps } from '@/types/member/member';
import AddressModal from '@/components/modal/AddressModal';
import { getMyPage, patchMyPassword, patchMyProfile } from '@/apis/member';
import Input from '@/components/common/Input';

export default function MyPageEdit() {
    const router = useRouter();

    const { isModalOpen: isAddressModalOpen, setIsModalOpen: setIsAddressModalOpen, setIsModalClose: setIsAddressModalClose } = useAddressModalStore();
    const { isModalOpen: isEditSuccessModalOpen, setIsModalOpen: setIsEditSuccessModalOpen, setIsModalClose: setIsEditSuccessModalClose } = useEditMyInfoModalStore();
    const { isModalOpen: isWrongPwModalOpen, setIsModalClose: setIsWrongPwModalClose } = useWrongPwModalStore();
    const { setName: setUserName, zipCode, roadAddress, detailAddress, setZipCode, setRoadAddress, setDetailAddress } = useMemberStore();

    const [memberType, setMemberType] = useState<MemberProps['member']>('PHARMACY');
    const [workplace, setWorkplace] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [originPw, setOriginPw] = useState<string>('');
    const [pw, setPw] = useState<string>('');
    const [pwConfirm, setPwConfirm] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [areaCode, setAreaCode] = useState<string>('010');
    const [phone1, setPhone1] = useState<string>('');
    const [phone2, setPhone2] = useState<string>('');
    const [latitude, setLatitude] = useState<number>(0);
    const [longtitude, setLongtitude] = useState<number>(0);
    // 조건 검사
    const [isOriginPwFilled, setIsOriginPwFilled] = useState<boolean>(pw.trim() !== "");
    const [isPwFilled, setIsPwFilled] = useState<boolean>(pw.trim() !== "");
    const [isPwConfirmFilled, setIsPwConfirmFilled] = useState<boolean>(true);
    const [isNameFilled, setIsNameFilled] = useState<boolean>(name.trim() !== "");
    const [isP1L4, setIsP1L4] = useState<boolean>(Number(phone1).toString().trim().length === 4);
    const [isP2L4, setIsP2L4] = useState<boolean>(Number(phone2).toString().trim().length === 4);
    const [isZipCodeFilled, setIsZipCodeFilled] = useState<boolean>(zipCode.trim() !== "");
    const [isRoadAddressFilled, setIsRoadAddressFilled] = useState<boolean>(roadAddress.trim() !== "");
    const [isDetailAddressFilled, setIsDetailAddressFilled] = useState<boolean>(detailAddress.trim() !== "");
    const isButtonActive = () => {
        // 수정 완료 버튼 활성화 여부
        if (isOriginPwFilled && isPwFilled && isPwConfirmFilled && isNameFilled && isP1L4 && isP2L4 && isZipCodeFilled && isRoadAddressFilled && isDetailAddressFilled && isValidPassword(pw)) {
            return true;
        } else {
            return false;
        }
    }

    const handleCancel = () => {
        router.back();
    };
    // 사용자 정보 조회 API
    const handleMyInfo = useCallback(async () => {
        try {
            const result = await getMyPage();

            if (result) {
                const { username, email, phoneNumber, role, workplace, address } = result;
                const new_role = role.split('_')[1];
                if (new_role === 'PHARMACY' || new_role === 'WHOLESALE') {
                    setMemberType(new_role);
                }
                setName(username);
                setEmail(email);
                setAreaCode(phoneNumber.split('-')[0]);
                setPhone1(phoneNumber.split('-')[1]);
                setPhone2(phoneNumber.split('-')[2]);
                setWorkplace(workplace);
                setZipCode(address.zipCode);
                setRoadAddress(address.roadAddress);
                setDetailAddress(address.detailAddress);
                setLatitude(address.latitude ?? 0);
                setLongtitude(address.longtitude ?? 0);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);
    // 회원 정보 수정 API
    const handleEditMyInfo = async () => {
        try {
            const [profileResult, pwResult] = await Promise.all([
                patchMyProfile({
                    username: name,
                    phoneNumber: `${areaCode}-${phone1}-${phone2}`,
                    address: {
                        zipCode,
                        roadAddress,
                        detailAddress
                    }
                }),
                patchMyPassword({
                    oldPassword: originPw,
                    newPassword: pw,
                    confirmNewPassword: pwConfirm,
                })
            ]);

            if (profileResult && pwResult) {
                setIsEditSuccessModalOpen();
                setUserName(name);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleMyInfo();
    }, []);

    useEffect(() => {
        setIsOriginPwFilled(originPw.trim() !== "");
        setIsPwFilled(pw.trim() !== "");
        setIsPwConfirmFilled(pwConfirm.trim() !== "" && pw === pwConfirm);
        setIsNameFilled(name.trim() !== "");
        setIsP1L4(Number(phone1).toString().trim().length === 4);
        setIsP2L4(Number(phone2).toString().trim().length === 4);
        setIsZipCodeFilled(zipCode.trim() !== "");
        setIsRoadAddressFilled(roadAddress.trim() !== "");
        setIsDetailAddressFilled(detailAddress.trim() !== "");
    }, [originPw, pw, pwConfirm, name, phone1, phone2, , zipCode, roadAddress, detailAddress, isNameFilled, isP1L4, isP2L4, isPwConfirmFilled, isPwFilled, isZipCodeFilled, isRoadAddressFilled, isDetailAddressFilled]);

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
                    회원 정보 수정
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
                                <input
                                    readOnly
                                    type="radio"
                                    name="memberType"
                                    value="PHARMACY"
                                    checked={memberType === 'PHARMACY'}
                                    className="w-5 h-5 accent-main-font"
                                />
                                <span className="text-main-font font-medium">약국</span>
                            </label>
                            <label className="flex flex-row items-center justify-center gap-3 w-50%">
                                <input
                                    readOnly
                                    type="radio"
                                    name="memberType"
                                    value="WHOLESALE"
                                    checked={memberType === 'WHOLESALE'}
                                    className="w-5 h-5 accent-main-font"
                                />
                                <span className="text-main-font font-medium">도매상</span>
                            </label>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-6 flex flex-row items-center gap-4 border-b-2 border-gray-200">
                        <label className="w-32 text-main-font font-medium space-x-1">
                            <span>{memberType === 'PHARMACY' ? "약국" : "도매상"}명</span>
                        </label>
                        <div className="flex-1 flex-row items-center">
                            <input
                                type="text"
                                value={workplace}
                                placeholder={memberType === 'PHARMACY' ? "약국명 입력" : "도매상명 입력"}
                                onChange={(e) => setWorkplace(e.target.value)}
                                className="w-full h-15 px-4 py-3 border border-gray-300 text-sm text-sub-font border-none outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-medium text-main-font border-b-2 border-gray-800 pb-2">
                        기본 정보
                    </h3>

                    <div>
                        <div className="bg-gray-100 p-6 flex flex-row items-start gap-4 border-b-2 border-gray-200">
                            <label className="w-32 pt-3 text-main-font font-medium">
                                이메일
                            </label>
                            <div className="flex-1 flex-col items-center">
                                <div className="flex flex-row items-center">
                                    <input
                                        readOnly
                                        type="text"
                                        value={email}
                                        placeholder={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                        }}
                                        className="w-full h-15 px-4 py-3 border border-gray-300 text-sm text-sub-font border-none outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-6 flex items-start gap-4 border-b-2 border-gray-200">
                            <label className="w-32 pt-3 text-main-font font-medium">
                                <span className="text-point-negative">•</span> 현재 비밀번호
                            </label>
                            <div className="flex-1">
                                <Input
                                    type="password"
                                    value={originPw}
                                    placeholder="기존 비밀번호 입력"
                                    onChange={(e) => setOriginPw(e.target.value)}
                                    disabled={false}
                                />
                            </div>
                        </div>

                        <div className="bg-gray-100 p-6 h-[120px] flex items-start gap-4 border-b-2 border-gray-200">
                            <label className="w-32 pt-3 text-main-font font-medium">
                                <span className="text-point-negative">•</span> 비밀번호 변경
                            </label>
                            <div className="flex-1">
                                <Input
                                    type="password"
                                    value={pw}
                                    placeholder="새로운 비밀번호 입력"
                                    onChange={(e) => setPw(e.target.value)}
                                    disabled={false}
                                />
                                <div className="text-xs mt-2">
                                    {pw !== "" &&
                                        (isValidPassword(pw)
                                            ? <p className="text-xs text-point-positive mt-2">비밀번호 조건을 통과하였습니다.</p>
                                            : <p className="text-xs text-point-negative mt-2">비밀번호 조건을 통과하지 못했습니다.</p>
                                        )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-6 h-[120px] flex items-start gap-4 border-b-2 border-gray-200">
                            <label className="w-32 pt-3 text-main-font font-medium">
                                <span className="text-point-negative">•</span> 비밀번호 확인
                            </label>
                            <div className="flex-1">
                                <Input
                                    type="password"
                                    value={pwConfirm}
                                    placeholder="비밀번호 확인"
                                    onChange={(e) => setPwConfirm(e.target.value)}
                                    disabled={false}
                                />
                                <div className="text-xs mt-2">
                                    {pwConfirm !== "" &&
                                        (!isPwConfirmFilled
                                            ? <p className="text-xs text-point-negative mt-2">비밀번호가 일치하지 않습니다.</p>
                                            : <p className="text-xs text-point-positive mt-2">비밀번호가 일치합니다.</p>
                                        )}
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-6 flex items-start gap-4 border-b-2 border-gray-200">
                            <label className="w-32 pt-3 text-main-font font-medium">
                                <span className="text-point-negative">•</span> 이름
                            </label>
                            <div className="flex-1">
                                <Input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder=''
                                    disabled={false}
                                />
                            </div>
                        </div>

                        <div className="bg-gray-100 p-6 flex items-start gap-4 border-b-2 border-gray-200">
                            <label className="w-32 pt-3 text-main-font font-medium">
                                <span className="text-point-negative">•</span> 휴대전화
                            </label>
                            <div className="flex-1 flex items-center gap-2">
                                <select
                                    aria-label="area-code"
                                    value={areaCode}
                                    onChange={(e) => setAreaCode(e.target.value)}
                                    className="w-full max-w-[90px] h-15 px-4 py-3 border border-gray-300 text-sm text-main-font focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                                >
                                    <option value="010">010</option>
                                    <option value="011">011</option>
                                    <option value="016">016</option>
                                    <option value="017">017</option>
                                    <option value="018">018</option>
                                    <option value="019">019</option>
                                </select>
                                <span className="text-gray-600">―</span>
                                <input
                                    aria-label="phone number"
                                    type="text"
                                    value={phone1}
                                    placeholder='1234'
                                    onChange={(e) => setPhone1(e.target.value)}
                                    maxLength={4}
                                    className="w-full h-15 max-w-lg flex-1 px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                                />
                                <span className="text-gray-600">―</span>
                                <input
                                    aria-label="phone number"
                                    type="text"
                                    value={phone2}
                                    placeholder='5678'
                                    onChange={(e) => setPhone2(e.target.value)}
                                    maxLength={4}
                                    className="w-full h-15 max-w-lg flex-1 px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-100 p-6 flex items-start gap-4 border-b-2 border-gray-200">
                            <label className="w-32 pt-3 text-main-font font-medium">
                                <span className="text-point-negative">•</span> 주소
                            </label>
                            <div className="flex-1 space-y-3">
                                <div className="flex flex-row gap-2">
                                    <Input
                                        type="text"
                                        value={zipCode}
                                        disabled={true}
                                        placeholder="우편번호"
                                    />
                                    <button
                                        name="search address button"
                                        onClick={setIsAddressModalOpen}
                                        className="w-32 h-15 p-3 bg-white text-sm border-2 border-main-font"
                                    >
                                        주소 검색
                                    </button>
                                </div>
                                <Input
                                    type="text"
                                    value={roadAddress}
                                    disabled={true}
                                    placeholder="기본 주소"
                                />
                                <Input
                                    type="text"
                                    value={detailAddress}
                                    placeholder="나머지 주소"
                                    disabled={false}
                                    onChange={(e) => setDetailAddress(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-12 mb-8">
                    <button
                        name="cancel button"
                        onClick={handleCancel}
                        className="flex-1 py-4 bg-white border-2 border-gray-300 text-gray-800 font-medium text-lg hover:bg-gray-50 transition-colors"
                    >
                        취소
                    </button>
                    <button
                        name="signup button"
                        onClick={handleEditMyInfo}
                        className={isButtonActive()
                            ? "flex-1 py-4 bg-main-logo text-white font-medium text-lg hover:bg-gray-700 transition-colors"
                            : "flex-1 py-4 bg-sub-font text-white font-medium text-lg"
                        }
                        disabled={!isButtonActive()}
                    >
                        수정 완료
                    </button>
                </div>

                {
                    isEditSuccessModalOpen
                        ? <NotiModal
                            type='check'
                            message={"회원 정보를 성공적으로 수정하였습니다.\n회원 정보 페이지로 넘어갑니다."}
                            hasButton={true}
                            hasTwoButton={false}
                            onClickYes={() => {
                                setIsEditSuccessModalClose();
                                router.back();
                            }}
                            onClose={setIsEditSuccessModalClose}
                        />
                        : null
                }

                {
                    isAddressModalOpen
                        ? <AddressModal
                            onClose={setIsAddressModalClose}
                        />
                        : null
                }

                {
                    isWrongPwModalOpen ? (
                        <NotiModal
                            type="alert"
                            message="기존 비밀번호가 일치하지 않습니다."
                            hasButton={true}
                            hasTwoButton={false}
                            onClickYes={setIsWrongPwModalClose}
                            onClose={setIsWrongPwModalClose}
                        />
                    ) : null
                }
            </div>
        </div>
    );
}