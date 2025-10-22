import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useAddressModalStore, useMemberStore, useSignupModalStore } from '@/store/store';
import NotiModal from '@/components/modal/NotiModal';
import { isValidEmail, isValidPassword } from '@/utils/utility';
import { MemberProps } from '@/types/member';
import AddressModal from '@/components/modal/AddressModal';

export default function SignUp() {
    const router = useRouter();

    const { isModalOpen, setIsModalOpen, setIsModalClose } = useSignupModalStore();
    const { isModalOpen: isAddressModalOpen, setIsModalOpen: setIsAddressModalOpen, setIsModalClose: setIsAddressModalClose } = useAddressModalStore();
    const { zipCode, roadAddress, detailAddress, setDetailAddress } = useMemberStore();

    const [memberType, setMemberType] = useState<MemberProps['member']>('pharmacy');
    const [workplace, setWorkplace] = useState<string>('');
    const [isSignup, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>('');
    const [pw, setPw] = useState<string>('');
    const [pwConfirm, setPwConfirm] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [areaCode, setAreaCode] = useState<string>('010');
    const [phone1, setPhone1] = useState<string>('');
    const [phone2, setPhone2] = useState<string>('');
    // 조건 검사
    const [isEmailFilled, setIsEmailFilled] = useState<boolean>(email.trim() !== "");
    const [isPwFilled, setIsPwFilled] = useState<boolean>(pw.trim() !== "");
    const [isPwConfirmFilled, setIsPwConfirmFilled] = useState<boolean>(true);
    const [isNameFilled, setIsNameFilled] = useState<boolean>(name.trim() !== "");
    const [isP1L4, setIsP1L4] = useState<boolean>(Number(phone1).toString().trim().length === 4);
    const [isP2L4, setIsP2L4] = useState<boolean>(Number(phone2).toString().trim().length === 4);
    const [isZipCodeFilled, setIsZipCodeFilled] = useState<boolean>(zipCode.trim() !== "");
    const [isRoadAddressFilled, setIsRoadAddressFilled] = useState<boolean>(roadAddress.trim() !== "");
    const [isDetailAddressFilled, setIsDetailAddressFilled] = useState<boolean>(detailAddress.trim() !== "");
    const isButtonActive = () => {
        // 회원가입 버튼 활성화 여부
        if (isEmailFilled && isPwFilled && isPwConfirmFilled && isNameFilled && isP1L4 && isP2L4 && isZipCodeFilled && isRoadAddressFilled && isDetailAddressFilled && isValidEmail(email) && isValidPassword(pw)) {
            return true;
        } else {
            return false;
        }
    }

    const handleCancel = () => {
        // 취소 버튼 누를 시 이전 페이지로 이동
        router.back();
    };

    const handleSignUp = () => {
        // 회원가입 API 연동

        // 성공
        setIsSignUp(true); // 일단 무조건 연결되는 상태
        setIsModalOpen();

        // 실패
    };

    useEffect(() => {
        if (isModalOpen) {
            setTimeout(() => {
                setIsModalClose();
            }, 2000);
        } else if (isSignup && !isModalOpen) {
            router.push('/');
        }
    }, [isSignup, router, isModalOpen, setIsModalClose]);

    useEffect(() => {
        setIsEmailFilled(email.trim() !== "");
        setIsPwFilled(pw.trim() !== "");
        setIsPwConfirmFilled(pwConfirm.trim() !== "" && pw === pwConfirm);
        setIsNameFilled(name.trim() !== "");
        setIsP1L4(Number(phone1).toString().trim().length === 4);
        setIsP2L4(Number(phone2).toString().trim().length === 4);
        setIsZipCodeFilled(zipCode.trim() !== "");
        setIsRoadAddressFilled(roadAddress.trim() !== "");
        setIsDetailAddressFilled(detailAddress.trim() !== "");
    }, [email, pw, pwConfirm, name, phone1, phone2, , zipCode, roadAddress, detailAddress, isEmailFilled, isNameFilled, isP1L4, isP2L4, isPwConfirmFilled, isPwFilled, isZipCodeFilled, isRoadAddressFilled, isDetailAddressFilled]);

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
                    />
                </div>

                <h1
                    className="text-4xl font-bold text-center text-main-logo mb-8"
                    style={{ fontStyle: 'italic' }}
                >
                    Medict
                </h1>

                <h2 className="text-2xl md:text-3xl font-bold text-center text-main-font mb-8">
                    회원가입
                </h2>

                <div className="mb-8">
                    <h3 className="text-lg font-medium text-main-font border-b-2 border-gray-800 pb-2">
                        회원
                    </h3>

                    <div className="bg-gray-100 p-6 flex flex-row items-center gap-4 border-b-2 border-gray-200">
                        <label className="w-32 text-main-font font-medium">
                            <span className="text-point-negative">•</span> 회원 구분
                        </label>
                        <div className="flex flex-row gap-10">
                            <label className="flex flex-row items-center justify-center gap-3 cursor-pointer">
                                <input
                                    type="radio"
                                    name="memberType"
                                    value="pharmacy"
                                    checked={memberType === 'pharmacy'}
                                    onChange={(e) => setMemberType(e.target.value as 'pharmacy')}
                                    className="w-5 h-5 accent-main-font"
                                />
                                <span className="text-main-font font-medium">약국</span>
                            </label>
                            <label className="flex flex-row items-center justify-center gap-3 cursor-pointer w-50%">
                                <input
                                    type="radio"
                                    name="memberType"
                                    value="wholesaler"
                                    checked={memberType === 'wholesaler'}
                                    onChange={(e) => setMemberType(e.target.value as 'wholesaler')}
                                    className="w-5 h-5 accent-main-font"
                                />
                                <span className="text-main-font font-medium">도매상</span>
                            </label>
                        </div>
                    </div>

                    <div className="bg-gray-100 p-6 flex flex-row items-center gap-4 border-b-2 border-gray-200">
                        <label className="w-32 text-main-font font-medium space-x-1">
                            <span className="text-point-negative">•</span>
                            <span>{memberType === 'pharmacy' ? "약국" : "도매상"}명</span>
                        </label>
                        <div className="flex-1 flex-row items-center">
                            <input
                                type="text"
                                value={workplace}
                                placeholder={memberType === 'pharmacy' ? "약국명 입력" : "도매상명 입력"}
                                onChange={(e) => setWorkplace(e.target.value)}
                                className="w-full h-15 px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-medium text-main-font border-b-2 border-gray-800 pb-2">
                        기본 정보
                    </h3>

                    <div>
                        <div className="bg-gray-100 h-[120px] p-6 flex flex-row items-start gap-4 border-b-2 border-gray-200">
                            <label className="w-32 pt-3 text-main-font font-medium">
                                <span className="text-point-negative">•</span> 이메일
                            </label>
                            <div className="flex-1 flex-col items-center">
                                <div className="flex flex-row items-center space-x-2">
                                    <input
                                        type="text"
                                        value={email}
                                        placeholder="이메일 입력"
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full h-15 px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                                    />
                                </div>
                                <p className="text-xs text-point-positive mt-2">
                                    {!isEmailFilled
                                        ? ""
                                        : isValidEmail(email)
                                            ? <p className="text-xs text-point-positive mt-2">사용 가능한 이메일입니다.</p>
                                            : <p className="text-xs text-point-negative mt-2">입력한 이메일을 확인해주세요.</p>
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-6 flex items-start gap-4 border-b-2 border-gray-200">
                            <label className="w-32 pt-3 text-main-font font-medium">
                                <span className="text-point-negative">•</span> 비밀번호
                            </label>
                            <div className="flex-1">
                                <input
                                    type="password"
                                    value={pw}
                                    placeholder="비밀번호 입력 (영문 대소문자/숫자/특수문자 중 3가지 이상 조합, 8자~16자)"
                                    onChange={(e) => setPw(e.target.value)}
                                    className="w-full h-15 px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-100 p-6 h-[120px] flex items-start gap-4 border-b-2 border-gray-200">
                            <label className="w-32 pt-3 text-main-font font-medium">
                                <span className="text-point-negative">•</span> 비밀번호 확인
                            </label>
                            <div className="flex-1">
                                <input
                                    type="password"
                                    value={pwConfirm}
                                    placeholder="비밀번호 확인"
                                    onChange={(e) => setPwConfirm(e.target.value)}
                                    className="w-full h-15 px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                                />
                                <p className="text-xs text-point-negative mt-2">
                                    {pwConfirm !== "" &&
                                        (!isPwConfirmFilled
                                            ? <p className="text-xs text-point-negative mt-2">비밀번호가 일치하지 않습니다.</p>
                                            : <p className="text-xs text-point-positive mt-2">비밀번호가 일치합니다.</p>
                                        )}
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-6 flex items-start gap-4 border-b-2 border-gray-200">
                            <label className="w-32 pt-3 text-main-font font-medium">
                                <span className="text-point-negative">•</span> 이름
                            </label>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={name}
                                    placeholder="이름 입력"
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full h-15 px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                                />
                            </div>
                        </div>

                        <div className="bg-gray-100 p-6 flex items-start gap-4 border-b-2 border-gray-200">
                            <label className="w-32 pt-3 text-main-font font-medium">
                                <span className="text-point-negative">•</span> 휴대전화
                            </label>
                            <div className="flex-1 flex items-center gap-2">
                                <select
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
                                    type="text"
                                    value={phone1}
                                    placeholder='1234'
                                    onChange={(e) => setPhone1(e.target.value)}
                                    maxLength={4}
                                    className="w-full h-15 max-w-lg flex-1 px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                                />
                                <span className="text-gray-600">―</span>
                                <input
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
                                    <input
                                        type="text"
                                        value={zipCode}
                                        disabled={true}
                                        placeholder="우편번호"
                                        className="w-full h-15 px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                                    />
                                    <button
                                        onClick={setIsAddressModalOpen}
                                        className="w-32 h-15 p-3 bg-white text-sm border-2 border-main-font"
                                    >
                                        주소 검색
                                    </button>
                                </div>
                                <input
                                    type="text"
                                    value={roadAddress}
                                    disabled={true}
                                    placeholder="기본 주소"
                                    className="w-full h-15 px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                                />
                                <input
                                    type="text"
                                    value={detailAddress}
                                    placeholder="나머지 주소"
                                    onChange={(e) => setDetailAddress(e.target.value)}
                                    className="w-full h-15 px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 mt-12 mb-8">
                    <button
                        onClick={handleCancel}
                        className="flex-1 py-4 bg-white border-2 border-gray-300 text-gray-800 font-medium text-lg hover:bg-gray-50 transition-colors"
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSignUp}
                        className={isButtonActive()
                            ? "flex-1 py-4 bg-main-logo text-white font-medium text-lg hover:bg-gray-700 transition-colors"
                            : "flex-1 py-4 bg-sub-font text-white font-medium text-lg"
                        }
                        disabled={!isButtonActive()}
                    >
                        회원가입
                    </button>
                </div>

                {
                    isModalOpen
                        ? <NotiModal
                            type='check'
                            message={"회원가입에 성공했습니다.\n로그인 페이지로 넘어갑니다."}
                            onClose={setIsModalClose}
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
            </div>
        </div>
    );
}