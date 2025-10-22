export interface signupReq {
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