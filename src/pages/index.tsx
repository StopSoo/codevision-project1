import { useEffect, useState, KeyboardEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Button from '@/components/common/Button';

import { MemberProps } from '@/types/member/member';
import { useMemberStore, useLoginModalStore, useLoginFailModalStore, useNotExistEmailModalStore, useWrongPwModalStore, useWithdrawalModalStore } from '@/store/store';
import { postLoginInfo } from '@/apis/login';
import dynamic from 'next/dynamic';

const NotiModal = dynamic(() => import("@/components/modal/NotiModal"), {
  ssr: false
});

export default function Home() {
  const router = useRouter();
  const { member, setMember, setName, isLogin, setLogin } = useMemberStore();
  const { isModalOpen, setIsModalOpen, setIsModalClose } = useLoginModalStore();
  const { isModalOpen: isFailModalOpen, setIsModalClose: setIsFailModalClose } = useLoginFailModalStore();
  const { isModalOpen: isNotExistModalOpen, setIsModalClose: setIsNotExistModalClose } = useNotExistEmailModalStore();
  const { isModalOpen: isWrongPwModalOpen, setIsModalClose: setIsWrongPwModalClose } = useWrongPwModalStore();
  const { isModalOpen: isWithdrawalModalOpen, setIsModalClose: setIsWithdrawalModalClose } = useWithdrawalModalStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [memberType, setMemberType] = useState<MemberProps['member']>('PHARMACY');
  const isButtonActive = email.trim() !== "" && password.trim() !== "";

  const enterkey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    // 서버에서 아이디, 비밀번호 검증
    try {
      const result = await postLoginInfo({
        email, password, role: 'ROLE_' + memberType
      });

      if (result && "data" in result) {
        setLogin(); // 로그인 상태로 변경
        setMember(memberType);
        setIsModalOpen();
        setName(result.data.username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        setIsModalClose();
        router.push(member === 'PHARMACY' ? '/order' : '/predict-item');
      }, 2000);
    } else if (isFailModalOpen || isNotExistModalOpen || isWrongPwModalOpen || isWithdrawalModalOpen) {
      setTimeout(() => {
        setIsFailModalClose();
        setIsNotExistModalClose();
        setIsWrongPwModalClose();
        setIsWithdrawalModalClose();
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogin, member, isModalOpen, setIsModalClose, isFailModalOpen, setIsFailModalClose, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-main-bg">
      <div className="w-full max-w-lg px-8">
        <div className="flex justify-center mb-8">
          <Image
            src="/assets/pharmacy-logo.png"
            alt="Medict Logo"
            width={200}
            height={200}
            priority
            sizes="200px"
            fetchPriority="high"
          />
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold text-center text-main-logo mb-12"
          style={{ fontStyle: "italic" }}
        >
          Medict
        </h1>

        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-main-font mb-4">
            로그인
          </h2>

          <input
            name="email"
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors text-main-font placeholder-sub-font"
          />

          <input
            name="password"
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyUp={(e) => enterkey(e)}
            className="w-full px-6 py-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors text-main-font placeholder-sub-font"
          />

          <div className="bg-white rounded-xl shadow-md px-6 py-4 flex items-center border border-gray-300 focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors">
            <label className="flex flex-row w-full items-center justify-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="memberType"
                value="PHARMACY"
                checked={memberType === "PHARMACY"}
                onChange={(e) => setMemberType(e.target.value as "PHARMACY")}
                className="w-5 h-5 accent-main-font"
              />
              <span className="text-main-font font-medium">약국</span>
            </label>
            <label className="flex flex-row w-full items-center justify-center gap-3 cursor-pointer w-50%">
              <input
                type="radio"
                name="memberType"
                value="WHOLESALE"
                checked={memberType === "WHOLESALE"}
                onChange={(e) => setMemberType(e.target.value as "WHOLESALE")}
                className="w-5 h-5 accent-main-font"
              />
              <span className="text-main-font font-medium">도매상</span>
            </label>
          </div>

          <Button
            text="로그인"
            height={57}
            disabled={!isButtonActive}
            bgColor="main-color"
            onClick={handleLogin}
          />

          <div className="mt-8 py-10 px-12 rounded-xl border border-gray-200 bg-white">
            <h3 className="text-lg md:text-2xl font-bold text-center text-main-font mb-2">
              아직 회원이 아니신가요?
            </h3>
            <p className="text-xs md:text-base font-thin text-center text-sub-font mb-6">
              회원가입을 하고 서비스를 이용해보세요!
            </p>
            <button
              onClick={handleSignup}
              className="w-full py-3 border border-gray-400 text-lg md:text-xl text-main-font font-bold hover:bg-gray-50 transition-colors"
            >
              회원가입
            </button>
          </div>
        </div>
      </div>

      {
        // 로그인 성공
        isModalOpen ? (
          <NotiModal
            type="check"
            message="로그인되었습니다."
            hasButton={false}
            hasTwoButton={false}
            onClose={setIsModalClose}
          />
        ) : null
      }

      {
        // 로그인 실패
        isFailModalOpen ? (
          <NotiModal
            type="alert"
            message="로그인에 실패했습니다."
            hasButton={false}
            hasTwoButton={false}
            onClose={setIsFailModalClose}
          />
        ) : null
      }

      {
        // 로그인 실패 - 이메일이 존재하지 않음
        isNotExistModalOpen ? (
          <NotiModal
            type="alert"
            message="존재하지 않는 이메일입니다."
            hasButton={false}
            hasTwoButton={false}
            onClose={setIsNotExistModalClose}
          />
        ) : null
      }

      {
        // 로그인 실패 - 비밀번호 불일치
        isWrongPwModalOpen ? (
          <NotiModal
            type="alert"
            message="비밀번호가 일치하지 않습니다."
            hasButton={false}
            hasTwoButton={false}
            onClose={setIsWrongPwModalClose}
          />
        ) : null
      }

      {
        // 로그인 실패 - 탈퇴한 사용자
        isWithdrawalModalOpen ? (
          <NotiModal
            type="alert"
            message="탈퇴한 사용자입니다."
            hasButton={false}
            hasTwoButton={false}
            onClose={setIsWithdrawalModalClose}
          />
        ) : null
      }
    </div>
  );
}
