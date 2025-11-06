/* 회원 */
export type MemberProps = {
    member: 'PHARMACY' | 'WHOLESALE'
};

export type MemberStore = {
    member: MemberProps[member]; // 회원 분류
    setMember: (newState: string) => void; // 회원 분류 변경
    isLogin: boolean; // 로그인 여부
    setLogin: () => void; // 로그인 상태로 변경하는 함수
    setLogout: () => void; // 로그아웃 상태로 변경하는 함수
    name: string; // 회원명
    setName: (memberName: string) => void; // 회원명을 변경하는 함수
    zipCode: string; // 우편번호
    setZipCode: (data: string) => void; // 우편번호를 변경하는 함수
    roadAddress: string; // 도로명 주소
    setRoadAddress: (data: string) => void; // 도로명주소를 변경하는 함수
    detailAddress: string; // 상세 주소
    setDetailAddress: (data: string) => void; // 상세 주소를 변경하는 함수
}

/* 모달 */
export type ModalStore = {
    isModalOpen: boolean;
    setIsModalOpen: () => void;
    setIsModalClose: () => void;
}

/* 마이페이지 API */
// 마이페이지
export interface MyPageRes {
    data: {
        username: string;
        email: string;
        phoneNumber: string;
        role: string;
        workplace: string;
        address: {
            zipCode: string;
            roadAddress: string;
            detailAddress: string;
            latitude: number;
            longtitude: number;
        }
    }
}
// 내 정보 수정
export interface UpdateProfileReq {
    username: string;
    phoneNumber: string;
    address: {
        zipCode: string;
        roadAddress: string;
        detailAddress: string;
    }
}

export interface UpdateProfileRes {
    data: Record<string, never>;
}
// 비밀번호 변경
export interface UpdatePasswordReq {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}