import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSignupModalStore } from '@/store/store';
import NotiModal from '@/components/modal/NotiModal';

type MemberProps = {
    member: 'pharmacy' | 'wholesaler'
};

export default function SignUp() {
    const router = useRouter();
    const { isModalOpen, setIsModalOpen, setIsModalClose } = useSignupModalStore();

    const [memberType, setMemberType] = useState<MemberProps['member']>('pharmacy');
    const [isSignup, setIsSignUp] = useState<boolean>(false);
    const [id, setId] = useState<string>('');
    const [pw, setPw] = useState<string>('');
    const [pwConfirm, setPwConfirm] = useState<string>('');
    const [name, setName] = useState<string>('');

    const [areaCode, setAreaCode] = useState<string>('010');
    const [phone1, setPhone1] = useState<string>('');
    const [phone2, setPhone2] = useState<string>('');

    const [isIdFilled, setIsIdFilled] = useState<boolean>(id.trim() !== "");
    const [isPwFilled, setIsPwFilled] = useState<boolean>(pw.trim() !== "");
    const [isPwConfirmFilled, setIsPwConfirmFilled] = useState<boolean>(pwConfirm.trim() !== "" && pw === pwConfirm);
    const [isNameFilled, setIsNameFilled] = useState<boolean>(name.trim() !== "");
    const [isP1L4, setIsP1L4] = useState<boolean>(Number(phone1).toString().trim().length === 4);
    const [isP2L4, setIsP2L4] = useState<boolean>(Number(phone2).toString().trim().length === 4);
    const isButtonActive = () => {
        // 회원가입 버튼 활성화 여부
        if (isIdFilled && isPwFilled && isPwConfirmFilled && isNameFilled && isP1L4 && isP2L4) {
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
        // 입력칸이 모두 채워졌을 때만 로그인 가능
        setIsIdFilled(id.trim() !== "");
        setIsPwFilled(pw.trim() !== "");
        setIsPwConfirmFilled(pwConfirm.trim() !== "" && pw === pwConfirm);
        setIsNameFilled(name.trim() !== "");
        setIsP1L4(Number(phone1).toString().trim().length === 4);
        setIsP2L4(Number(phone2).toString().trim().length === 4);
    }, [id, pw, pwConfirm, name, phone1, phone2, isIdFilled, isNameFilled, isP1L4, isP2L4, isPwConfirmFilled, isPwFilled]);

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
                        회원 구분
                    </h3>
                    <div className="bg-gray-100 p-6 flex items-center gap-20 border-b-2 border-gray-200">
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

                <div className="mb-8">
                    <h3 className="text-lg font-medium text-main-font border-b-2 border-gray-800 pb-2">
                        기본 정보
                    </h3>
                    <div>
                        <div className="bg-gray-100 p-6 flex items-start gap-4 border-b-2 border-gray-200">
                            <label className="w-32 pt-3 text-main-font font-medium">
                                <span className="text-point-negative">•</span> 아이디
                            </label>
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={id}
                                    onChange={(e) => setId(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                                />
                                <p className="text-xs text-sub-font mt-2">(영문소문자/숫자, 4~16자)</p>
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
                                    onChange={(e) => setPw(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                                />
                                <p className="text-xs text-sub-font mt-2">
                                    (영문 대소문자/숫자/특수문자 중 3가지 이상 조합, 8자~16자)
                                </p>
                            </div>
                        </div>

                        <div className="bg-gray-100 p-6 flex items-start gap-4 border-b-2 border-gray-200">
                            <label className="w-32 pt-3 text-main-font font-medium">
                                <span className="text-point-negative">•</span> 비밀번호 확인
                            </label>
                            <div className="flex-1">
                                <input
                                    type="password"
                                    value={pwConfirm}
                                    onChange={(e) => setPwConfirm(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                                />
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
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
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
                                    className="w-full max-w-[90px] px-4 py-3 border border-gray-300 text-main-font focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
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
                                    className="w-full max-w-lg flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
                                />
                                <span className="text-gray-600">―</span>
                                <input
                                    type="text"
                                    value={phone2}
                                    placeholder='5678'
                                    onChange={(e) => setPhone2(e.target.value)}
                                    maxLength={4}
                                    className="w-full max-w-lg flex-1 px-4 py-3 border border-gray-300 focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors"
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
                            message={"회원가입에 성공했습니다.\n로그인 페이지로 넘어갑니다."}
                            onClose={setIsModalClose}
                        />
                        : null
                }
            </div>
        </div>
    );
}