// 회원가입
interface SignupSuccessRes {
    data: {
        username: string;
        role: string;
    };
}

interface SignupFailRes {
    code: string;
    message: string;
}

export interface SignupReq {
    username: string; // 사용자 이름
    email: string;
    password: string;
    phoneNumber: string;
    workplace: string;
    role: string; // 약국 || 도매상
    address: {
        zipCode: string; // 우편번호
        roadAddress: string; // 일반 주소
        detailAddress: string; // 상세 주소
    }
}

export type SignupRes = SignupSuccessRes | SignupFailRes;

// 이메일 중복 검사
export interface CheckEmailReq {
    email: string;
    role: string;
}

export interface CheckEmailRes {
    data: {
        result: boolean;
    }
}