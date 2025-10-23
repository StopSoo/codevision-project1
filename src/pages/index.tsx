import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import NotiModal from '@/components/modal/NotiModal';
import Button from '@/components/common/Button';

import { MemberProps } from '@/types/member';
import { useMemberStore, useLoginModalStore, useLoginFailModalStore } from '@/store/store';
import { postLoginInfo } from '@/apis/login';

export default function Home() {
  const router = useRouter();
  const { member, setMember, isLogin, setLogin } = useMemberStore();
  const { isModalOpen, setIsModalOpen, setIsModalClose } = useLoginModalStore();
  const { isModalOpen: isFailModalOpen, setIsModalClose: setIsFailModalClose } = useLoginFailModalStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [memberType, setMemberType] = useState<MemberProps['member']>('PHARMACY');
  const [isEmailFilled, setIsEmailFilled] = useState(email.trim() !== "");
  const [isPwFilled, setIsPwFilled] = useState(password.trim() !== "");
  const isButtonActive = () => {
    // 로그인 버튼 활성화 여부
    if (isEmailFilled && isPwFilled) {
      return true;
    } else {
      return false;
    }
  }

  const handleLogin = async () => {
    // 서버에서 아이디, 비밀번호 검증
    try {
      const result = await postLoginInfo({ email, password, role: 'ROLE_' + memberType });

      if (result) {
        setLogin(); // 로그인 상태로 변경
        setMember(memberType);
        setIsModalOpen();
      } else {
        setIsFailModalClose();
      }
    } catch (error) {
      alert("서버 오류 또는 로그인 실패");
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
      }, 2000);
    } else if (isLogin && !isModalOpen) {
      if (member === 'PHARMACY') {
        // 약국 회원일 경우 AI 오늘의 주문 페이지로 이동
        router.push('/order');
      } else {
        // 도매상 회원일 경우 주문 예상 품목 페이지로 이동
        router.push('/predict-item');
      }
    }
  }, [isLogin, member, isModalOpen, setIsModalClose, router]);

  useEffect(() => {
    // 아이디와 비밀번호 모두 채워졌을 때만 로그인 가능
    setIsEmailFilled(email.trim() !== "");
    setIsPwFilled(password.trim() !== "");
  }, [email, password]);

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
          />
        </div>
        <h1
          className="text-4xl md:text-5xl font-bold text-center text-main-logo mb-12"
          style={{ fontStyle: 'italic' }}
        >
          Medict
        </h1>

        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-main-font mb-4">
            로그인
          </h2>

          <input
            type="text"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-6 py-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors text-main-font placeholder-sub-font"
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors text-main-font placeholder-sub-font"
          />

          <div className="bg-white rounded-xl shadow-md px-6 py-4 flex items-center border border-gray-300 focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors">
            <label className="flex flex-row w-full items-center justify-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="memberType"
                value="PHARMACY"
                checked={memberType === 'PHARMACY'}
                onChange={(e) => setMemberType(e.target.value as 'PHARMACY')}
                className="w-5 h-5 accent-main-font"
              />
              <span className="text-main-font font-medium">약국</span>
            </label>
            <label className="flex flex-row w-full items-center justify-center gap-3 cursor-pointer w-50%">
              <input
                type="radio"
                name="memberType"
                value="WHOLESALE"
                checked={memberType === 'WHOLESALE'}
                onChange={(e) => setMemberType(e.target.value as 'WHOLESALE')}
                className="w-5 h-5 accent-main-font"
              />
              <span className="text-main-font font-medium">도매상</span>
            </label>
          </div>

          <Button
            text="로그인"
            height={57}
            disabled={!isButtonActive()}
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
        isModalOpen
          ? <NotiModal
            type='check'
            message='로그인되었습니다.'
            onClose={setIsModalClose}
          />
          : null
      }

      {
        // 로그인 실패
        isFailModalOpen
          ? <NotiModal
            type='alert'
            message='로그인에 실패했습니다.'
            onClose={setIsFailModalClose}
          />
          : null
      }
    </div>
  );
}
