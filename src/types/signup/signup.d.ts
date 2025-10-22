export interface SignupApi {
    username: string;
    role: string;
}

export interface SignupReq {
    userName: string; // 사용자 이름
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

export interface SignupRes {
    isSuccess: boolean;
    code: number;
    message: string;
    result: SignupApi;
}