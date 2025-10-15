import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Home() {
  const router = useRouter();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // 로그인 API 연결 시 수정
    console.log('Login attempt:', { id, password });
  };

  const handleSignup = () => {
    router.push('/signup');
  };

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
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-6 py-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors text-main-font placeholder-sub-font"
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 rounded-xl shadow-md border border-gray-300 focus:outline-none focus:border-selected-line focus:bg-selected-bg transition-colors text-main-font placeholder-sub-font"
          />

          <button
            onClick={handleLogin}
            className="w-full py-4 rounded-xl bg-main-color text-white font-bold text-xl hover:bg-hover-green transition-colors"
          >
            로그인
          </button>

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
    </div>
  );
}
